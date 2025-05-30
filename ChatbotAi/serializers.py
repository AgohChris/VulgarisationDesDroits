from rest_framework.serializers import ModelSerializer, ValidationError
from .models import *


class MessageChatSerializer(ModelSerializer):
    class Meta:
        model = MessageChat
        fields = ['expediteur', 'contenue', 'timestamp']


class ChatSessionSerializer(ModelSerializer):
    messages = MessageChatSerializer(many=True, read_only=True)  # Inclure les messages

    class Meta:
        model = ChatSession
        fields = ['session_id', 'created_at', 'messages']  # Assurez-vous que 'messages' est inclus ici


class NewsletterAbonneeSerializer(ModelSerializer):
    class Meta:
        model = NewsletterAbonnee
        fields = ['id', 'email', 'date_inscription', 'is_active']


class NewsletterMessageSerializer(ModelSerializer):
    class Meta:
        model = NewsletterMessage
        fields = ['id', 'objet', 'contenue', 'statut', 'date_envoie', 'updated_at']
        extra_kwargs = {
            'objet': {'required': True},
            'contenue': {'required': True},
        }


class RessourceSerializer(ModelSerializer):
    class Meta:
        model = Ressource
        fields = ['id', 'intitule', 'description', 'upload', 'type', 'date_ajout', 'lien']

    
    def validate(self, data):
        type_ressource = data.get('type')

        if type_ressource in ['guide', 'fiche'] and not data.get('upload'):
            raise ValidationError(f"Un fichier est requis pour le type '{type_ressource}'.")
        if type_ressource == 'video' and not data.get('lien'):
            raise ValidationError("un lien est requis pour le type 'video'.")
        if type_ressource == 'podcast' and not (data.get('upload') or data.get('lien')):
            raise ValidationError("Un fichier ou un lien est requis pour le type 'podcast'.")
       
        return data

