from rest_framework.serializers import ModelSerializer
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
        fields = ['id', 'intitule', 'description', 'upload', 'type', 'date_ajout']

    