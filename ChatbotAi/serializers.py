from rest_framework.serializers import ModelSerializer
from .models import ChatSession, MessageChat


class MessageChatSerializer(ModelSerializer):
    class Meta:
        model = MessageChat
        fields = ['expediteur', 'contenue', 'timestamp']


class ChatSessionSerializer(ModelSerializer):
    messages = MessageChatSerializer(many=True, read_only=True)  # Inclure les messages

    class Meta:
        model = ChatSession
        fields = ['session_id', 'created_at', 'messages']  # Assurez-vous que 'messages' est inclus ici