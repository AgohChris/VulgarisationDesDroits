from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get_ai_response
import uuid
from .models import *
from .serializers import *
from rest_framework.generics import ListAPIView



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
        serializer = NewsletterMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

