from django.urls import path
from .views import ChatBotAPIVIEW, ChatSessionListAPiView, ChatbotInteractionsCountAPIView

urlpatterns = [
    path('chatbot/', ChatBotAPIVIEW.as_view(), name='chatbot_api'),
    path('chats/liste/', ChatSessionListAPiView.as_view(), name='chat_sessions'),
    path('chatbot/interactions/count/', ChatbotInteractionsCountAPIView.as_view(), name='chatbot_interactions_count'),
]