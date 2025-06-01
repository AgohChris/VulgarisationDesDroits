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

    # Lister les Abonnes
    path('newsletter/abonnee/liste', NewsletterListeAbonmeeView.as_view(), name='newsletter_abonnee_liste'),
    # Compter les abonnees
    path('newsletter/abonnee/count/', NewsletterAbonneeCountAPIView.as_view(), name='newsletter_abonnee_count'),
    # Lister les messages enregistrer
    path('newsletter/messages/liste/', NewsletterMessageListeView.as_view(), name='newsletter_messages'),
    # Créer un message 
    path('newsletter/messages/create', NewsletterMessageView.as_view(), name='newsletter_messages'),
    # Modifier un message
    path('newsletter/messages/<int:pk>/update', NewsletterMessageUpdateView.as_view(), name='newsletter_message_update'),
    # Supprimer un message
    path('newsletter/messages/<int:pk>/suppression', NewsletterMessageDeleteView.as_view(), name='newsletter_message_delete'),
    # Envoyer un message
    path('newsletter/messages/<int:pk>/send/', SendNewsletterAPIView.as_view(), name='send_newsletter'),


    # ========== Ressources
    # Liste tout les types de ressource
    path('ressources/liste', RessourceListAPIView.as_view(), name="ressource_liste"),
    # ajout des ressource 
    path('ressources/ajouts', RessourceCreateAPIView.as_view(), name="ressource_ajout"),
    # Modification des ressources
    path('ressources/<int:pk>/update', RessourceUpdateAPIView.as_view(), name="ressource_update"),
    # Suppression des ressources
    path('ressources/<int:pk>/delete', RessourceSuppressionApiView.as_view(), name="ressource_delete"),
    # Comptage des ressources
    path('ressources/count', ComptageRessourceAPiIView.as_view(), name="ressource_count"),
    

    # Lister les differents types
    path('ressources/liste/type/<str:type>', RessourceListeTypeAPIView.as_view(), name="ressource_liste_type"),
    # path('ressources/liste/type/fiche', RessourceListeTypeFiche.as_view(), name="ressource_liste_type_fiche"),
    # path('ressources/liste/type/podcast', RessourceListeTypePodcast.as_view(), name="ressource_liste_type_podcast"),
    # path('ressources/liste/type/video', RessourceListeTypeVideo.as_view(), name="ressource_liste_type_video"),



]
