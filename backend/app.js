require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

// Import des modèles pour création automatique des tables
require('./models/user');

const app = express();

//CORS, système de sécurité empêche les requêtes malveillantes d'accéder à des ressources sensibles
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//Middleware qui transforme le corps de la requete en objet js utilisable
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);

// export de app et pouvoir y accéder depuis les autres fichiers js
module.exports = app;