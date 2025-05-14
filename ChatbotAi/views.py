from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get_ai_response
import uuid
from .models import ChatSession, MessageChat
from .serializers import ChatSessionSerializer
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
    