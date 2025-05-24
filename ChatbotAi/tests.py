from django.test import TestCase
import unittest
from .utils import *

# Create your tests here.

class TestGetAIResponse(unittest.TestCase):
    def test_reponse_locale_similaire(self):
        message = "les droits d'un salarié licensié"
        reponse = get_ai_response(message)
        self.assertIn("droits d’un salarié licencié", reponse.lower())
        self.assertIn("préavis", reponse.lower())
        self.assertIn("indemnité", reponse.lower())

    def test_reponse_locale_exacte(self):
        message = "Quels sont les droits d’un salarié licencié ?"
        reponse = get_ai_response(message)
        self.assertIn("Il existe 2 cas :", reponse)

    def test_reponse_locale_conges(self):
        message = "Comment calculés les congés payés en Côte d’Ivoire ?"
        reponse = get_ai_response(message)
        self.assertIn("Pour calculer les congés payés en C.I il faut suivre 6 étapes :", reponse)
        self.assertIn("Déterminer la période de référence", reponse)
        self.assertIn("Calculer enfin les allocations de congés payés", reponse)

    def test_reponse_api(self):
        message = "Quelle est la capitale de la Côte d'Ivoire ?"
        reponse = get_ai_response(message)
        self.assertNotEqual(reponse, "Désolé, je ne comprends pas.")

if __name__ == "__main__":
    unittest.main()
