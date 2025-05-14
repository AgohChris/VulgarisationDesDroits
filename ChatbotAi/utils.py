# import requests
from openai import OpenAI
import traceback
import dotenv
import os

dotenv.load_dotenv()


# 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

# Remplace par ta clé API OpenRouter
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Initialiser le client OpenAI via OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

def get_ai_response(message_utilisateur):
    try:

        # contexte_dynamique = (
        #     "Voici un extrait pertinent du Code du Travail ivoirien : "
        #     "Article XYZ : 'Tout salarié a droit à une indemnité en cas de licenciement abusif.' "
        #     "Utilise ces informations pour répondre à la question."
        # )



        # Envoyer une requête à l'API OpenRouter
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
                        "Tu es un assistant juridique spécialisé dans le droit et la justice en Côte d'Ivoire. "
                        "Tu réponds aux questions en te basant uniquement sur les lois, règlements et pratiques juridiques "
                        "de la Côte d'Ivoire."
                        "Tu adoptes une approche pédagogique en expliquant les concepts juridiques de manière simple et accessible, "
                        "comme si tu parlais à quelqu'un sans connaissances juridiques. "
                        "Tu dois suivre la logique et les recommandations de ma coéquipière juriste, qui privilégie des réponses "
                        "claires, précises et adaptées au contexte ivoirien. "
                        # f"{contexte_dynamique}"
                        "Si une question n'est pas liée au droit ivoirien, indique poliment que tu ne peux pas répondre. "
                        "Si une question concerne le droit, réponds d'abord de manière simple en français facile, "
                        "puis donne une explication plus détaillée et technique si nécessaire."

                        # "Voici un exemple de réponse que tu dois suivre : "
                        # "Question : Quels sont les droits d'un salarié en Côte d'Ivoire en cas de licenciement abusif ? "
                        # "Réponse : En Côte d'Ivoire, un salarié victime de licenciement abusif a droit à une indemnité compensatoire. "
                        # "En termes simples, cela signifie qu'il peut recevoir une compensation financière pour le préjudice subi. "
                        # "Plus techniquement, cela est prévu par l'article XYZ du Code du Travail ivoirien, qui stipule que..."
                    )
                },
                {"role": "user", "content": message_utilisateur}
            ],
            max_tokens=300,
            temperature=0.3,
        )
        
        # Extraire la réponse
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Erreur OpenRouter : {e}")
        traceback.print_exc()  # Affiche la pile d'erreurs complète
        return "Désolé, je ne comprends pas."