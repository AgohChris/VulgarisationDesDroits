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


def recherche_reponse(message_utilisateur, donnees, seuil_similarite=80):
    """
    Recherche une réponse dans les données JSON en fonction du message utilisateur,
    avec correspondance approximative.
    """
    meilleure_question = None
    meilleure_similarite = 0
    meilleure_reponse = None

    for domaine, themes in donnees.items():
        for theme, contenu in themes.items():
            for question in contenu.get("questions", []):
                # Calculer la similarité entre la question posée et les questions du JSON
                similarite = fuzz.ratio(message_utilisateur.lower(), question["question"].lower())
                print(f"Similarité entre '{message_utilisateur}' et '{question['question']}': {similarite}%")
                if similarite > meilleure_similarite and similarite >= seuil_similarite:
                    meilleure_similarite = similarite
                    meilleure_question = question["question"]
                    simple = question["simple"]
                    if isinstance(simple, dict):
                        simple_reponse = "\n".join([simple.get("introduction", ""), simple.get("cas_1", ""), simple.get("cas_2", "")])
                    else:
                        simple_reponse = simple
                    
                    technique = question.get("technique", "")
                    exemple = question.get("exemple", "")
                    meilleure_reponse = f"{simple_reponse}\n\n{technique}\n\nExemple : {exemple}"

    if meilleure_reponse:
        print(f"Question similaire trouvée : {meilleure_question} (Similarité : {meilleure_similarite}%)")
        return meilleure_reponse

    print("Aucune réponse trouvée dans les données JSON.")
    return None



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
                        "Tu dois suivre la logique et les recommandations de ma coéquipière juriste, qui privilégie des réponses "
                        "claires, précises et adaptées au contexte ivoirien. "
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
        
        # Extraire la réponse de l'API
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Erreur OpenRouter : {e}")
        traceback.print_exc()  # Affiche la pile d'erreurs complète
        return "Désolé, je ne comprends pas."
    


def ajouter_reponse(domaine, theme, question, simple, exemple, fichier="juriste_data.json"):
    
    donnees = charger_donnees_juriste(fichier)

    if domaine not in donnees:
        donnees[domaine] = {}
    if theme not in donnees[domaine]:
        donnees[domaine][theme] = {"questions": []}


    # Ajout de nouvellle question
    donnees[domaine][theme]["question"].append({
        "question": question,
        "simple": simple,
        "exemple": exemple
    })

    # ecrire et Sauvegarder la question dans je Json en fonction du domaine
    with open (fichier, "w") as f:
        json.dump(donnees, f, indent=4, ensure_ascii=False)
    print(f"Question ajouté sous le thème : '{theme} dans le domaine '{domaine}'.")

