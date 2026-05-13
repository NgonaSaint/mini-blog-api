# Mini Blog API

Backend de l'application Mini Blog. Serveur Node.js avec Express qui gère l'authentification et les articles.

## Technologies utilisées

- Node.js
- Express
- JSON Web Token (JWT)
- Bcryptjs
- Nodemon

## Installation

cd mini-blog-api
npm install
npm run dev

Le serveur démarre sur http://localhost:3000

## Routes disponibles

### Authentification

| Méthode | Chemin | Description |
|---------|--------|-------------|
| POST | /auth/register | Inscription |
| POST | /auth/login | Connexion |

### Articles

| Méthode | Chemin | Accès | Description |
|---------|--------|-------|-------------|
| GET | /articles | Public | Liste de tous les articles |
| GET | /articles/:id | Public | Détail d'un article |
| GET | /articles/my | Privé | Articles de l'utilisateur connecté |
| POST | /articles | Privé | Créer un article |
| PUT | /articles/:id | Privé | Modifier un article |
| DELETE | /articles/:id | Privé | Supprimer un article |

## Sécurité

Les routes privées nécessitent un token JWT dans le header de la requête.

Authorization: Bearer TON_TOKEN
