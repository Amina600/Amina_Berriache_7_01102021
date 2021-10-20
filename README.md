# Groupomania : Réseau social

## Installation

### Backend

- Créer une base de données MySQL et un utilisateur
- Dans le dossier `backend/config/` créer un fichier `config.json` en prenant comme example le fichier `config_example.json`
- Ajouter dans le fichier `config.json` les information de connexion à la base de données MySQL
- Dans le dossier `backend/` créer un fichier `.env` en prenant comme example le fichier `.env.example` en ajoutant une chaine de caractères aléatoire.
- Exécuter les commandes :
```
cd backend
npm install
npx sequelize-cli db:migrate
```
- Lancer le serveur back
```
npm run serve
```

### Frontend
- Exécuter les commandes :
```
cd frontend
npm install
```
- Lancer le serveur front
```
npm run serve
```
