from django.db import models

# Create your models here.

class ChatSession(models.Model):
    session_id = models.CharField(max_length=255, unique=True, null=False, blank=False)
    created_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.session_id
    

class MessageChat(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name="messages")
    expediteur = models.CharField(max_length=15, choices=[("utilisateur", "Utilisateur"), ("bot", "Bot")])
    contenue = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.expediteur}: {self.contenue[:50]}"
    
    