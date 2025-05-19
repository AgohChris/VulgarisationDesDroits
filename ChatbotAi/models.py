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
    

class NewsletterAbonnee(models.Model):
    email = models.EmailField(unique=True)
    date_inscription = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.email} inscrit le {self.date_inscription} "
    


class NewsletterMessage(models.Model):
    objet = models.CharField(max_length=10)
    contenue = models.TextField(blank=False)
    date_creation = models.DateTimeField(auto_now=True)
    statut = models.CharField(max_length=30, choices=[("brouillon", "Brouillon"), ("envoyée", "Envoyée")], default="brouillon")
    date_envoie = models.DateTimeField(null=True, blank=True)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.objet} - {self.statut}"

