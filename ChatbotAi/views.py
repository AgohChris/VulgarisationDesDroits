from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get_ai_response
import uuid
from .models import *
from .serializers import *
from rest_framework.generics import ListAPIView
from django.core.mail import send_mail
from django.utils.timezone import now



# Create your views here.

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
        


class ChatSessionListAPiView(ListAPIView):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer



class ChatbotInteractionsCountAPIView(APIView):
    def get(self,  request):
        try:
            interaction_count = MessageChat.objects.count()
            return Response({"interaction_count":interaction_count}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erreur dans la View ChatBotInteractionCount... : {e}")
            return Response({"error": "Errur interne sur le serveur"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    

class NewsletterAbonneeView(APIView):
    def get(self, request):
        abonnes = NewsletterAbonnee.objects.filter(is_active=True)
        serializer = NewsletterAbonneeSerializer(abonnes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request):
        serializer = NewsletterAbonneeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class NewsletterMessageView(APIView):
    def get(self, request):
        messages = NewsletterMessage.objects.all()
        serializer = NewsletterMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print("Données reçues :", request.data)  # Log des données reçues
        serializer = NewsletterMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Erreurs de validation :", serializer.errors)  # Log des erreurs
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SendNewsletterAPIView(APIView):
    def post(self, request, pk):
        try:
            message = NewsletterMessage.objects.get(pk=pk, is_sent=False)
            abonnés = NewsletterAbonnee.objects.filter(is_active=True)

            for abonné in abonnés:
                send_mail(
                    subject=message.objet,
                    message=message.contenue,
                    from_email='agohchris90@gmail.com',
                    recipient_list=[abonné.email],
                )

            message.is_sent = True
            message.date_envoie = now()
            message.save()

            return Response({"message": "Newsletter envoyée avec succès."}, status=status.HTTP_200_OK)
        except NewsletterMessage.DoesNotExist:
            return Response({"error": "Message introuvable ou déjà envoyé."}, status=status.HTTP_404_NOT_FOUND)



class NewsletterMessageDetailAPIView(APIView):
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

    def delete(self, request, pk):
        message = self.get_object(pk)
        if not message:
            return Response({"error": "Message introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        message.delete()
        return Response({"message": "Message supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
    