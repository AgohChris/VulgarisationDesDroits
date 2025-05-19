from django.contrib import admin
from .models import *


# Register your models here.
admin.site.register(ChatSession)
admin.site.register(MessageChat)
admin.site.register(NewsletterAbonnee)
admin.site.register( NewsletterMessage)