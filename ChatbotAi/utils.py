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
                        "de la Côte d'Ivoire. Si une question n'est pas liée au droit ivoirien, indique poliment que tu ne peux pas répondre."
                        "Si une question concerne le droit répond a cette question mais d'abord de façon terre a terre en français facile de sorte a ce que n'importe qui puisse comprendre."
                    )
                },
                {"role": "user", "content": message_utilisateur}
            ],
            max_tokens=200,
            temperature=0.3,
        )
        
        # Extraire la réponse
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Erreur OpenRouter : {e}")
        traceback.print_exc()  # Affiche la pile d'erreurs complète
        return "Désolé, je ne comprends pas."