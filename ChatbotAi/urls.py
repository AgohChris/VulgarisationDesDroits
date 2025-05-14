from django.urls import path
from .views import ChatBotAPIVIEW, ChatSessionListAPiView

urlpatterns = [
    path('chatbot/', ChatBotAPIVIEW.as_view(), name='chatbot_api'),
    path('chats/liste/', ChatSessionListAPiView.as_view(), name='chat_sessions'),
]
