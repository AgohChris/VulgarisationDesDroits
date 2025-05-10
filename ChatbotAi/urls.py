from django.urls import path
from .views import ChatBotAPIVIEW

urlpatterns = [
    path('chatbot/', ChatBotAPIVIEW.as_view(), name='chatbot_api'),
]
