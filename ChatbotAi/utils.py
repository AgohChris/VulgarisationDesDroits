# import requests
from openai import OpenAI


# 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

# Remplace par ta clé API OpenRouter
OPENROUTER_API_KEY = "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"

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
                "HTTP-Referer": "https://votre-site.com",  # Optionnel
                "X-Title": "Vulgarisation des Droits",  # Optionnel
            },
            model="openai/gpt-4.1",  # Modèle utilisé
            messages=[
                {"role": "system", "content": "Tu es un assistant qui répond de manière simple et claire."},
                {"role": "user", "content": message_utilisateur}
            ],
            max_tokens=150,
            temperature=0.3,
        )
        
        # Extraire la réponse
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Erreur OpenRouter : {e}")
        return "Désolé, je ne comprends pas."