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
        return f"{self.email} inscrit le {self.date_inscription}"
    


class NewsletterMessage(models.Model):
    objet = models.CharField(max_length=255)
    contenue = models.TextField()
    statut = models.CharField(max_length=50, default='brouillon')
    date_envoie = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.objet} - {self.statut}"


TYPE_CHOICES = [
        ('guide', 'Guide Pratique'),
        ('fiche', 'Fiche'),
        ('podcast', 'Podcast'),
        ('video', 'Vidéo'),
    ]

class Ressource(models.Model):
    intitule = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    upload = models.FileField(upload_to='ressources/', null=True, blank=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='guide')
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.intitule} - {self.date_ajout.strftime('%Y-%m-%d')} ({self.get_type_display()})"

class GuidePratique(Ressource):
    pass

class Fiche(Ressource):
    pass

class Podcast(Ressource):
    lien = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.intitule} - {self.lien}"

class Video(Ressource):
    lien = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.intitule} - {self.lien}"