
const bcrypt = require('bcrypt');
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const sequelize = require('../database');

//Clé secrète pour l'email
var key = cryptoJS.enc.Hex.parse(process.env.SECRET_TOKEN);
// Initialiser le vecteur
var iv = cryptoJS.enc.Hex.parse(process.env.SECRET_TOKEN);
//Encrypter l'email
const encryptEmail = (string) => {
  const enc = cryptoJS.AES.encrypt(string, key, { iv: iv }).toString();
  return enc;
};

exports.signup = (req, res, next) => {
  if(req.body.password.length < 6 || req.body.password.length > 250){
    res.status(400).json({ message: 'Mot de passe invalide !' });
    return;
  }
  const body = req.body;
  bcrypt.hash(body.password, 10)
    .then(hash => {
      const user = {
          pseudo: body.pseudo,
          email: encryptEmail(body.email),
          password: hash,
          isAdmin: false
      };
      sequelize.models.User.create(user)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Error server' });
      console.log(err);
    }); 
};

exports.login = (req, res, next) => {

  sequelize.models.User.findOne({
    where : {
      email: encryptEmail(req.body.email)
    }
  }).then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            pseudo: user.pseudo,
            token: jwt.sign(
              { userId: user.id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
  .catch(error => res.status(500).json({ error }));
};