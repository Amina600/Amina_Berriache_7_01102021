require('dotenv').config();
//Importer express(permet d'ajouter une série de fonctions appelées middleware)
const express = require('express');
//Importer package body-parser pour extraire l'objet JSON.
const bodyParser = require('body-parser');
require ('./models/user');


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


// export de app et pouvoir y acceder depuis les autres fichiers js
module.exports = app;