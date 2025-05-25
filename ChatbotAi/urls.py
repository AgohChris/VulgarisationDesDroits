from django.urls import path
from .views import *

urlpatterns = [
    path('chatbot/', ChatBotAPIVIEW.as_view(), name='chatbot_api'),
    path('chats/liste/', ChatSessionListAPiView.as_view(), name='chat_sessions'),
    path('chatbot/interactions/count/', ChatbotInteractionsCountAPIView.as_view(), name='chatbot_interactions_count'),


    # Newsletter
    # Abonnement à la newsletter
    path('newsletter/abonnee', NewsletterAbonneeView.as_view(), name='newsletter_abonnee'),
    # Désabonnement à la newsletter
    path('newsletter/desabonnement', NewsletterDesabonnementView.as_view(), name='newsletter_desabonnement'),


    path('newsletter/abonnee/liste', NewsletterListeAbonmeeView.as_view(), name='newsletter_abonnee_liste'),
    path('newsletter/abonnee/count/', NewsletterAbonneeCountAPIView.as_view(), name='newsletter_abonnee_count'),
    path('newsletter/messages/liste/', NewsletterMessageListeView.as_view(), name='newsletter_messages'),
    path('newsletter/messages/create', NewsletterMessageView.as_view(), name='newsletter_messages'),
    path('newsletter/messages/<int:pk>/update', NewsletterMessageUpdateView.as_view(), name='newsletter_message_update'),
    path('newsletter/messages/<int:pk>/suppression', NewsletterMessageDeleteView.as_view(), name='newsletter_message_delete'),
    path('newsletter/messages/<int:pk>/send/', SendNewsletterAPIView.as_view(), name='send_newsletter'),
]