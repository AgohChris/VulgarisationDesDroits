from rest_framework.serializers import ModelSerializer
from .models import ChatSession, MessageChat, NewsletterAbonnee, NewsletterMessage


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
        fields = ['id', 'objet', 'contenue', 'date_creation', 'statut', 'date_envoie', 'is_sent']