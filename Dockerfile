# Utilise une image officielle PHP avec Apache
FROM php:8.2-apache

# Installe les extensions PHP nécessaires à Laravel et PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql zip

# Active le module Apache rewrite (important pour Laravel)
RUN a2enmod rewrite

# Installe Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copie le code source dans le conteneur
COPY . /var/www/html

# Définit le répertoire de travail
WORKDIR /var/www/html/public

# Installe les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# Donne les bons droits au dossier de stockage et cache
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# (Optionnel) Installe Node.js et build les assets si tu utilises Laravel Mix/Vite
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && if [ -f package.json ]; then npm install && npm run build; fi

# Expose le port 80
EXPOSE 80

# Commande de démarrage
CMD ["apache2-foreground"]