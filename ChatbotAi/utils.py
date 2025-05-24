import requests
from openai import OpenAI
import traceback
import dotenv
import os
import json
from rapidfuzz import fuzz, process


dotenv.load_dotenv()



# Remplace par ta clé API OpenRouter
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Initialiser le client OpenAI via OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)



def charger_donnees_juriste(fichier="ChatbotAi/juriste_data.json"):
    try:
        with open(fichier, "r") as f:
            print(f"Fichier {fichier} chargé avec succès.")
            return json.load(f)
    except FileNotFoundError:
        print(f"Le fichier {fichier} est introuvable.")
        return {}
    except json.JSONDecodeError:
        print(f"Erreur de format dans le fichier {fichier}.")
        return {}
    
donnees_juriste = charger_donnees_juriste()


def nettoyer_json(fichier_entree, fichier_sortie):
    """
    Supprime les champs inutiles (comme 'technique') dans le fichier JSON.
    """
    with open(fichier_entree, "r") as f:
        donnees = json.load(f)

    def nettoyer_questions(questions):
        for question in questions:
            if "technique" in question:
                del question["technique"]

    # Parcourir les domaines et nettoyer les questions
    for domaine, themes in donnees.items():
        for theme, contenu in themes.items():
            if "questions" in contenu:
                nettoyer_questions(contenu["questions"])

    # Sauvegarder le fichier nettoyé
    with open(fichier_sortie, "w") as f:
        json.dump(donnees, f, indent=4, ensure_ascii=False)
    print(f"Fichier nettoyé et sauvegardé sous : {fichier_sortie}")

# Exécuter le nettoyage
nettoyer_json("ChatbotAi/juriste_data.json", "ChatbotAi/juriste_data_nettoyer.json")


# Pour trouver une similarité en cas de reformulation des questions posé par l'utilisateur avant de répondre.
def recherche_reponse(message_utilisateur, donnees, seuil_similarite=80):
  
    meilleure_question = None
    meilleure_similarite = 0
    meilleure_reponse = None

    for domaine, themes in donnees.items():
        for theme, contenu in themes.items():
            for question in contenu.get("questions", []):
                if isinstance(question, dict) and "question" in question:
                    # Calculer la similarité entre la question posée et les questions du JSON
                    similarite = fuzz.ratio(message_utilisateur.lower(), question["question"].lower())
                    print(f"Similarité entre '{message_utilisateur}' et '{question['question']}': {similarite}%")
                    if similarite > meilleure_similarite and similarite >= seuil_similarite:
                        meilleure_similarite = similarite
                        meilleure_question = question["question"]
                        simple = question["simple"]
                        
                        # Traiter les réponses structurées
                        if isinstance(simple, dict):
                            simple_reponse = simple.get("introduction", "")
                            for key, value in simple.items():
                                if key.startswith("etape_") or key.startswith("exemple_"):
                                    simple_reponse += f"\n- {value}"
                        else:
                            simple_reponse = simple
                        
                        exemple = question.get("exemple", "")
                        meilleure_reponse = f"{simple_reponse}\n\nExemple : {exemple}"

    if meilleure_reponse:
        print(f"Question similaire trouvée : {meilleure_question} (Similarité : {meilleure_similarite}%)")
        return meilleure_reponse

    print("Aucune réponse trouvée dans les données JSON.")
    return None



def valider_donnees_json(donnees):
    for domaine, themes in donnees.items():
        for theme, contenu in themes.items():
            if "questions" in contenu :
                for question in contenu["questions"]:
                    if not isinstance(question,  dict) or "question" not in question:
                        print(f"Problème détecté dans le thème '{theme}' du domaine '{domaine}': {question}")
                        return False
                    
    return True

if not valider_donnees_json(donnees_juriste):
    print("Le fichier JSON contient des erreurs de structure.")



def get_ai_response(message_utilisateur):
    """
    Génère une réponse en utilisant les données locales ou en appelant l'API OpenRouter.
    """
    try:
        # Vérifier si une réponse existe dans les données JSON avec correspondance approximative
        reponse_locale = recherche_reponse(message_utilisateur, donnees_juriste, seuil_similarite=70)
        if reponse_locale:
            return reponse_locale

        # Si aucune réponse locale, appeler l'API OpenRouter
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://votre-site.com",  
                "X-Title": "Vulgarisation des Droits", 
            },
            model="openai/gpt-4.1",  # Modèle utilisé
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Tu es Miss Ella, une assistante juridique spécialisée dans le droit et la justice en Côte d'Ivoire. "
                        "Tu réponds aux questions en te basant uniquement sur les lois, règlements et pratiques juridiques "
                        "de la Côte d'Ivoire. "
                        "Tu adoptes une approche pédagogique en expliquant les concepts juridiques de manière simple et accessible, "
                        "comme si tu parlais à quelqu'un sans connaissances juridiques. "
                        "Si une question n'est pas liée au droit ivoirien, indique poliment que tu ne peux pas répondre. "
                        "Si une question concerne le droit, réponds d'abord de manière simple en français facile, "
                        "puis donne un exemple de cas pour élucider."
                    )
                },
                {"role": "user", "content": message_utilisateur}
            ],
            max_tokens=300,
            temperature=0.3,
        )

        # Ajouter un log pour inspecter la réponse complète de l'API
        print("Réponse complète de l'API OpenRouter :", completion)

        # Extraire la réponse de l'API
        if hasattr(completion, "choices") and len(completion.choices) > 0:
            message = completion.choices[0].message
            if hasattr(message, "content"):
                return message.content.strip()
        else:
            print("Réponse inattendue de l'API OpenRouter :", completion)
            return "Désolé, je ne comprends pas."
    except Exception as e:
        print(f"Erreur OpenRouter : {e}")
        traceback.print_exc()
        return "Désolé, je ne comprends pas."
    


def ajouter_reponse(domaine, theme, question, simple, exemple, fichier="juriste_data.json"):
    """
    Ajoute une nouvelle question et sa réponse dans le fichier JSON.
    """
    donnees = charger_donnees_juriste(fichier)

    if domaine not in donnees:
        donnees[domaine] = {}
    if theme not in donnees[domaine]:
        donnees[domaine][theme] = {"questions": []}

    # Ajouter la nouvelle question
    donnees[domaine][theme]["questions"].append({
        "question": question,
        "simple": simple,
        "exemple": exemple
    })

    # Sauvegarder les modifications dans le fichier JSON
    with open(fichier, "w") as f:
        json.dump(donnees, f, indent=4, ensure_ascii=False)
    print(f"Question ajoutée sous le thème '{theme}' dans le domaine '{domaine}'.")


