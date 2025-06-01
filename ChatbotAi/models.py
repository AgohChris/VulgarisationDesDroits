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
        ('fiche', 'Vidéo Explicative'),
        ('podcast', 'Podcast Juridique'),
        ('video', 'Fiche Thématique'),
    ]

class Ressource(models.Model):
    intitule = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    upload = models.FileField(upload_to='ressources/', null=True, blank=True)
    lien = models.URLField(max_length=200, blank=True, null=True) 
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Sauvegarder l'objet Ressource
        super().save(*args, **kwargs)

        # Enregistrer dans la sous-classe correspondante
        if self.type == 'guide':
            GuidePratique.objects.get_or_create(
                ressource_ptr=self,
                defaults={
                    'intitule': self.intitule,
                    'description': self.description,
                    'upload': self.upload,
                    'lien': self.lien,
                    'date_ajout': self.date_ajout
                }
            )
        
        elif self.type == 'fiche':
            Fiche.objects.get_or_create(
                ressource_ptr=self,
                defaults={
                    'intitule': self.intitule,
                    'description': self.description,
                    'upload': self.upload,
                    'lien': self.lien,
                    'date_ajout': self.date_ajout
                }
            )
        
        elif self.type == 'podcast':
            Podcast.objects.get_or_create(
                ressource_ptr=self,
                defaults={
                    'intitule': self.intitule,
                    'description': self.description,
                    'upload': self.upload,
                    'lien': self.lien,
                    'date_ajout': self.date_ajout
                }
            )
        
        elif self.type == 'video':
            Video.objects.get_or_create(
                ressource_ptr=self,
                defaults={
                    'intitule': self.intitule,
                    'description': self.description,
                    'upload': self.upload,
                    'lien': self.lien,
                    'date_ajout': self.date_ajout
                }
            )

    def __str__(self):
        return f"{self.intitule} - {self.date_ajout.strftime('%Y-%m-%d')} ({self.get_type_display()})"

class GuidePratique(Ressource):
    pass

class Fiche(Ressource):
    pass

class Podcast(Ressource):
    pass

class Video(Ressource):
    pass