# 🚀 Microservice d'Authentification

![Taille du repo GitHub](https://img.shields.io/github/repo-size/DracJulien/auth?style=flat-square)
![Problèmes GitHub](https://img.shields.io/github/issues/DracJulien/auth?style=flat-square)
![Étoiles GitHub](https://img.shields.io/github/stars/DracJulien/auth?style=flat-square)
![Licence GitHub](https://img.shields.io/github/license/DracJulien/auth?style=flat-square)

Un microservice d'authentification et de gestion des utilisateurs, facile à utiliser et à étendre, construit avec **Node.js**, **Express**, **Prisma**, et **TypeScript**. Ce microservice inclut également la gestion des rôles et utilise **Swagger** pour la documentation de l'API.

## ✨ Fonctionnalités

- 📦 **Gestion Utilisateur CRUD** : Création, Lecture, Mise à jour et Suppression des utilisateurs.
- 🔑 **Authentification JWT** : Authentification sécurisée utilisant les **JSON Web Tokens**.
- 🛠️ **Contrôle d'Accès Basé sur les Rôles** : Définissez différents rôles (par exemple, Admin, Utilisateur) et restreignez les accès en conséquence.
- 📚 **Documentation Swagger** : Documentation interactive de l'API via Swagger UI.
- 🐳 **Dockerisé** : Déploiement facile en utilisant **Docker**.
- ✅ **Tests Unitaires** : Tests unitaires écrits avec **Jest**.
- 📏 **ESLint** : Linting du code pour une qualité de code cohérente et propre.

## 📋 Table des Matières

- [Commencer](#-commencer)
- [Installation](#-installation)
- [Exécution en Local](#-exécution-en-local)
- [Exécution avec Docker](#-exécution-avec-docker)
- [Documentation de l'API](#-documentation-de-lapi)
- [Variables d'Environnement](#-variables-denvironnement)
- [Tests](#-tests)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## 🚀 Commencer

Pour démarrer avec le microservice d'authentification, suivez ces étapes simples.

### 🛠️ Prérequis

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) (facultatif pour exécuter dans des conteneurs)
- [MySQL](https://www.mysql.com/) ou [MariaDB](https://mariadb.org/)

## 📦 Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/yourusername/auth-microservice.git
   cd auth-microservice
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez vos variables d'environnement :
   - Copiez le fichier `.env.example` vers `.env` et modifiez les variables en conséquence.
   ```bash
   cp .env.example .env
   ```

## 💻 Exécution en Local

1. Exécutez les migrations de la base de données avec Prisma :
   ```bash
   npx prisma migrate dev --name init
   ```

2. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

## 🐳 Exécution avec Docker

Pour exécuter le microservice en utilisant Docker, utilisez la commande suivante :

```bash
docker-compose up --build
```

Cela démarrera le microservice ainsi qu'un conteneur MySQL.

## 📄 Documentation de l'API

Swagger UI est disponible à [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

![Capture d'écran Swagger UI](https://via.placeholder.com/600x300?text=Swagger+UI+Example)

## 🌱 Variables d'Environnement

Le fichier `.env` contient les variables d'environnement spécifiques, y compris :

- **`DATABASE_URL`** : L'URL pour votre base de données MySQL ou MariaDB.
- **`JWT_SECRET`** : Clé secrète pour la génération de tokens JWT.
- **`NODE_ENV`** : `development` ou `production`.

## 🧪 Tests

Ce microservice inclut des tests unitaires pour les fonctionnalités principales. Pour exécuter les tests :

```bash
npm run test
```

- **Surveiller les handles ouverts** avec Jest pour détecter les opérations asynchrones :

  ```bash
  npm run test -- --detectOpenHandles
  ```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Veuillez forker ce dépôt, créer une branche de fonctionnalité, et ouvrir une Pull Request pour contribuer.

1. Forkez le projet.
2. Créez votre branche de fonctionnalité : `git checkout -b feature/NouvelleFonctionnalite`.
3. Committez vos changements : `git commit -m 'Ajout d'une nouvelle fonctionnalité'`.
4. Poussez vers la branche : `git push origin feature/NouvelleFonctionnalite`.
5. Ouvrez une Pull Request.

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Fait avec ❤️ par [DracJulien].

