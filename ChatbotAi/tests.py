from django.test import TestCase
import unittest
from .utils import *

# Create your tests here.

class TestGetAIResponse(unittest.TestCase):
    def test_reponse_locale_similaire(self):
        message = "les droits d'un salarié licensié"
        reponse = get_ai_response(message)
        self.assertIn("droits d’un salarié licencié", reponse.lower())  # Vérifie que la réponse contient les droits
        self.assertIn("préavis", reponse.lower())  # Vérifie que le préavis est mentionné
        self.assertIn("indemnité", reponse.lower())  # Vérifie que l'indemnité est mentionnée

    def test_reponse_locale_exacte(self):
        message = "Quels sont les droits d’un salarié licencié ?"
        reponse = get_ai_response(message)
        self.assertIn("Il existe 2 cas :", reponse)  # Vérifie que l'introduction est présente

    def test_reponse_api(self):
        message = "Quelle est la capitale de la Côte d'Ivoire ?"
        reponse = get_ai_response(message)
        self.assertNotEqual(reponse, "Désolé, je ne comprends pas.")  # Vérifie que l'API répond

if __name__ == "__main__":
    unittest.main()
