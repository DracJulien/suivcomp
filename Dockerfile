# Étape 1 : Utilisation d'une image officielle Node.js comme image de base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package
COPY package.json package-lock.json ./

# Installer les dépendances nécessaires
RUN npm install

# Copier tous les fichiers source dans le répertoire de travail
COPY . .

RUN npx prisma generate
# Installer ts-node et nodemon globalement pour le développement
RUN npm install -g ts-node nodemon

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev"]
