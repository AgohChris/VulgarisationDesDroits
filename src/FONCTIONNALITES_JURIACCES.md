
# Fonctionnalités du site JuriAccès

## Navigation et Structure Générale
- **Navigation Principale :**
    - Accueil : Page de présentation principale.
    - Glossaire : Page dédiée aux définitions des termes juridiques.
    - Thématiques : Page regroupant les informations juridiques par grands domaines.
    - Ressources : Page offrant divers types de contenus pédagogiques.
- **Recherche Globale :** Barre de recherche dans l'en-tête qui redirige vers le glossaire avec le terme recherché.
- **Design Adaptatif (Responsive) :** Le site s'adapte aux différentes tailles d'écran (ordinateurs, tablettes, mobiles).
- **Menu Mobile :** Menu hamburger pour une navigation aisée sur les petits écrans.
- **Pied de Page (Footer) :**
    - Liens de navigation rapides.
    - Informations de contact (simulées).
    - Section d'inscription à la Newsletter.
- **Notifications (Toasts) :** Messages de confirmation ou d'erreur pour les actions utilisateur (ex: inscription newsletter).

## Page d'Accueil
- **Section Héros :**
    - Titre accrocheur et description du service.
    - Bouton "Découvrir" qui fait défiler vers la section des fonctionnalités.
    - Bouton "Consulter le glossaire" qui redirige vers la page Glossaire.
    - Illustration visuelle avec animations.
- **Section "Nos Fonctionnalités" :**
    - Présentation des atouts clés de la plateforme :
        - Vulgarisation juridique
        - Recherche simplifiée
        - Fiches thématiques
        - Accessibilité pour tous
        - Contenu audio
        - Exemples concrets
        - Documents juridiques (à venir)
- **Aperçu du Glossaire :**
    - Quelques termes juridiques avec leurs définitions en accordéon.
    - Bouton "Voir tout le glossaire" redirigeant vers la page Glossaire.
- **Aperçu des Thématiques :**
    - Cartes présentant quelques thématiques principales (Logement, Travail, Famille).
    - Boutons "En savoir plus" sur chaque carte redirigeant vers la section spécifique de la page Thématiques.
    - Bouton "Voir toutes les thématiques" redirigeant vers la page Thématiques.
- **Aperçu des Ressources :**
    - Cartes présentant les types de ressources (Guides, Vidéos, Podcasts).
    - Bouton "Voir toutes les ressources" redirigeant vers la page Ressources.
- **Appel à l'Action Final :** Section encourageant l'utilisateur à explorer la plateforme.

## Page Glossaire
- **Affichage des Termes :** Liste complète des termes juridiques.
- **Barre de Recherche Spécifique :** Permet de filtrer les termes du glossaire en temps réel.
- **Affichage en Accordéon :** Chaque terme peut être déplié pour voir sa définition et un exemple.
- **Ouverture Automatique :** Si la page est accédée via une recherche depuis l'en-tête, le premier terme correspondant est automatiquement ouvert.
- **Message si Aucun Résultat :** Indique à l'utilisateur si sa recherche ne donne aucun résultat.

## Page Thématiques
- **Navigation par Onglets :** Permet de sélectionner une thématique (Logement, Travail, Famille, Justice, Consommation, Santé).
- **Contenu Détaillé par Thématique :**
    - Description générale de la thématique.
    - Sous-sections avec des informations spécifiques (ex: "Bail d'habitation", "Contrat de travail").
    - Explications claires et détails pour chaque sous-section.
- **Défilement Ciblé :** Si la page est accédée via un lien d'aperçu (ex: de la page d'accueil), elle défile jusqu'à la thématique concernée et active l'onglet correspondant.
- **Bouton "Voir plus sur ce thème"** dans chaque onglet qui (actuellement) recharge la page avec l'ancre de la thématique.

## Page Ressources
- **Présentation des Catégories de Ressources :**
    - Guides pratiques (PDF)
    - Vidéos explicatives
    - Podcasts juridiques
    - Fiches thématiques (synthèses)
- **Liste d'Exemples par Catégorie :** Affiche quelques titres de ressources pour chaque type.
- **Défilement Ciblé :** Si la page est accédée via un lien d'aperçu, elle défile jusqu'à la catégorie de ressource concernée.
- **Boutons "Voir ces ressources"** dans chaque carte qui (actuellement) recharge la page avec l'ancre de la ressource.

## Fonctionnalités Interactives
- **Chatbot Flottant :**
    - Bouton pour ouvrir/fermer la fenêtre de chat.
    - Interface de messagerie simple.
    - Réponses simulées basées sur des mots-clés (logement, travail, famille, merci).
    - Historique des messages de la session.
- **Newsletter :**
    - Champ de saisie pour l'adresse e-mail.
    - Bouton d'inscription.
    - Notification de succès ou d'erreur après tentative d'inscription.

## Aspects Techniques et Visuels
- **Animations Fluides :** Utilisation de Framer Motion pour les transitions et les apparitions d'éléments.
- **Composants UI Réutilisables :** Utilisation de shadcn/ui pour les éléments d'interface (boutons, cartes, accordéons, etc.).
- **Icônes Claires :** Utilisation de Lucide React pour les icônes.
- **Style Cohérent :** Palette de couleurs et typographie modernes et lisibles.
- **Effets Visuels :** Gradients, ombres portées, effets de survol pour améliorer l'expérience utilisateur.

---
*Cette liste est basée sur l'état actuel du développement du site JuriAccès.*












JurisTech