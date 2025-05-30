from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get_ai_response, envoyer_email
import uuid
from .models import *
from .serializers import *
from rest_framework.generics import ListAPIView
from django.utils.timezone import now



# Create your views here.

# Api pour l'enregistrement des méssages
class ChatBotAPIVIEW(APIView):
    def post(self, request):
        message_utilsateur = request.data.get('message', '')
        session_id = request.data.get('session_id', None)

        if not message_utilsateur:
            return Response({"error": "Message requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Pour génerer un nouvel_id
        if not session_id:
            session_id = str(uuid.uuid4())
        
        session, created = ChatSession.objects.get_or_create(session_id=session_id)

        MessageChat.objects.create(session=session, expediteur="utilisateur", contenue=message_utilsateur)
        
        print(f"Message reçu : {message_utilsateur}")  # Log du message utilisateur
        try:
            reponse_ia = get_ai_response(message_utilsateur)
            MessageChat.objects.create(session=session, expediteur="bot", contenue=reponse_ia)

            # print(f"Réponse IA : {reponse_ia}")  # Log de la réponse IA
            return Response({"response": reponse_ia}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erreur dans ChatBotAPIVIEW : {e}")  # Log de l'erreur
            return Response({"error": "Erreur interne du serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# Api pour lister les message et les sessions
class ChatSessionListAPiView(ListAPIView):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer


# Api pour compter les interactions entre utilisateur et ChatBot pour les statistiques
class ChatbotInteractionsCountAPIView(APIView):
    def get(self,  request):
        try:
            interaction_count = MessageChat.objects.count()
            return Response({"interaction_count":interaction_count}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erreur dans la View ChatBotInteractionCount... : {e}")
            return Response({"error": "Errur interne sur le serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# APi pour compter les Newsletters
class NewsletterAbonneeCountAPIView(APIView):
    def get(self,  request):
        try:
            subscriber_count = NewsletterAbonnee.objects.count()
            return Response({"subscriber_count":subscriber_count}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erreur dans la View NewsletterAbonneeCount... : {e}")
            return Response({"error": "Errur interne sur le serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


# Api pour les Abonnées à la newsletter
class NewsletterAbonneeView(APIView):
    def post(self, request):
        serializer = NewsletterAbonneeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsletterListeAbonmeeView(APIView):
    def get(self, request):
        abonnes = NewsletterAbonnee.objects.filter(is_active=True)
        serializer = NewsletterAbonneeSerializer(abonnes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# Api pour le désabonnement des utilisateurs 
class NewsletterDesabonnementView(APIView):
    def delete(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error":"Pour vous désabonner, l'email est requis."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            abonnement = NewsletterAbonnee.objects.get(email=email)
            abonnement.delete()

            return Response({"messsage": "Désonscription réussie."}, status=status.HTTP_200_OK)
        except NewsletterAbonnee.DoesNotExist:
            return Response({"error":"Cet email n'existe pas"}, status=status.HTTP_400_BAD_REQUEST)


# Api poour l'enregistrement des newsletters 
class NewsletterMessageView(APIView):
    def post(self, request):
        print("Données reçues :", request.data)  # Log des données reçues
        serializer = NewsletterMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Erreurs de validation :", serializer.errors)  # Log des erreurs
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class NewsletterMessageListeView(APIView):
    def get(self, request):
        messages = NewsletterMessage.objects.all()
        serializer = NewsletterMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Api pour l'envoie des newsletters aux abonnées
class SendNewsletterAPIView(APIView):

    def post(self, request, pk):
        try:
            message = NewsletterMessage.objects.get(pk=pk, statut='brouillon')
            abonnes = NewsletterAbonnee.objects.filter(is_active=True)

            self.envoyer_newsletter(message, abonnes)


            message.statut = 'envoyé'
            message.date_envoie = now()
            message.save()

            return Response({"message": "Newsletter envoyée avec succès."}, status=status.HTTP_200_OK)
            
        except NewsletterMessage.DoesNotExist:
            return Response({"error": "Message introuvable ou déjà envoyé."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Erreur lors de l'envoi de la newsletter : {e}")
            return Response({"error": "Erreur interne du serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def envoyer_newsletter(self, message, abonnes):
            # on exécute l'envoi en bloucle pour envoyer la newsletter à tous les abonnés.
            for abonne in abonnes:
                try:
                    self.envoyer_email_html(message, abonne.email)
                except Exception as e:
                    print(f"Erreur lors de l'envoi de l'email à {abonne.email} : {e}")
                


    def envoyer_email_html(self, message, email):
        # Envoie du email en HTML.
        context = {
            "objet": message.objet,
            "contenue": message.contenue,   
        }
        try:
            envoyer_email(
                subject=message.objet,
                to_email=email,
                template_name="emails/newsletter_campagne.html",  # Assurez-vous que ce fichier existe
                context=context,
            )
        except Exception as e:
            print(f"Erreur lors de l'envoi de l'email HTML à {email} : {e}")
            raise

# Api pour modifier les newsletter
class NewsletterMessageUpdateView(APIView):
    def get_object(self, pk):
        try:
            return NewsletterMessage.objects.get(pk=pk)
        except NewsletterMessage.DoesNotExist:
            return None

    def put(self, request, pk):
        message = self.get_object(pk)
        if not message:
            return Response({"error": "Message introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = NewsletterMessageSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

# Api pour la suppression de Message de la newsletter
class NewsletterMessageDeleteView(APIView):
    def get_object(self, pk):
        try:
            return NewsletterMessage.objects.get(pk=pk)
        except NewsletterMessage.DoesNotExist:
            return None
        
    def delete(self, request, pk):
        message = self.get_object(pk)
        if not message:
            return Response({"error": "Message introuvable"}, status=status.HTTP_404_NOT_FOUND)
        message.delete()
        return Response({"message": "Message supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)


# Api pour lister toute les ressources
class RessourceListAPIView(ListAPIView):
    queryset = Ressource.objects.all()
    serializer_class = RessourceSerializer


# APi pour Ajouter une ressource 
class RessourceCreateAPIView(APIView):
    def post(self, request):
        serializer = RessourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#  Api pour modifier une ressource
class RessourceUpdateAPIView(APIView):
    def put(self, request, pk):
        try:
            ressource = Ressource.objects.get(pk=pk)
        except Ressource.DoesNotExist:
            return Response({"error": "Ressource introuvable"}, status=status.HTTP_404_NOT_FOUND)
        serializer = RessourceSerializer(ressource, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
    

# Api pour Supprimer une ressource
class RessourceSuppressionApiView(APIView):
    def delete(self, request, pk):
        try:
            ressource = Ressource.objects.get(pk=pk)
        except Ressource.DoesNotExist:
            return Response({"error": "Ressource introuvable"}, status=status.HTTP_404_NOT_FOUND)
        ressource.delete()
        return Response({"error": "Ressource introuvable"}, status=status.HTTP_404_NOT_FOUND)


# Api pour lister les Guides
class RessourceListeTypeGuide(APIView):
    def get(self, request, type):
        ressources = Ressource.objects.filter(type="guide")
        serializer = RessourceSerializer(ressources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Api pour lister les Fiches
class RessourceListeTypeFiche(APIView):
    def get(self, request, type):
        ressources = Ressource.objects.filter(type="fiche")
        serializer = RessourceSerializer(ressources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Api pour lister les Podcasts
class RessourceListeTypePodcast(APIView):
    def get(self, request, type):
        ressources = Ressource.objects.filter(type="podcast")
        serializer = RessourceSerializer(ressources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Api pour lister les Videos
class RessourceListeTypeVideo(APIView):
    def get(self, request, type):
        ressources = Ressource.objects.filter(type="video")
        serializer = RessourceSerializer(ressources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ComptageRessourceAPiIView(APIView):
    def get(self, request):
        try:
            count_ressources = Ressource.objects.count()
            return Response({"sount_ressource": count_ressources}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erreur dans la view ComptageRessource... : {e}")
            return Response({"error": "Erreur interne sur le serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

