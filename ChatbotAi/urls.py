from django.urls import path
from .views import *

urlpatterns = [
    path('chatbot/', ChatBotAPIVIEW.as_view(), name='chatbot_api'),
    path('chats/liste/', ChatSessionListAPiView.as_view(), name='chat_sessions'),
    path('chatbot/interactions/count/', ChatbotInteractionsCountAPIView.as_view(), name='chatbot_interactions_count'),


    path('newsletter/abonnee', NewsletterAbonneeView.as_view(), name='newsletter_abonnee'),
    # path('newsletter/abonnes/<int:pk>/', NewsletterAbonneeDetailAPIView.as_view(), name='newsletter_abonne_detail'),


    # Messages
    path('newsletter/messages/', NewsletterMessageView.as_view(), name='newsletter_messages'),
    path('newsletter/messages/<int:pk>/suppression', NewsletterMessageDetailAPIView.as_view(), name='newsletter_message_detail'),
    path('newsletter/messages/<int:pk>/send/', SendNewsletterAPIView.as_view(), name='send_newsletter'),

]