const bcrypt = require('bcrypt');
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const sequelize = require('../database');

// Clé secrète pour l'email
const key = cryptoJS.enc.Hex.parse(process.env.SECRET_TOKEN);
// Initialiser le vecteur
const iv = cryptoJS.enc.Hex.parse(process.env.SECRET_TOKEN);
// Chiffrer l'email
const encryptEmail = (string) => {
    return cryptoJS.AES.encrypt(string, key, {iv: iv}).toString();
};

exports.signup = async (req, res, next) => {
    const body = req.body;
    // Vérifie si le mot de passe est correcte
    if (body.password.length < 6 || body.password.length > 250) {
        res.status(400).json({message: 'Mot de passe invalide !'});
        return;
    }
    // Vérifie si le pseudo existe dans la base de donnée
    const pseudoExists = await sequelize.models.User.findOne({
        where: {
            pseudo: body.pseudo
        }
    });
    // Vérifier si l'email existe dans la base de donnée
    const emailExists = await sequelize.models.User.findOne({
        where: {
            email: encryptEmail(body.email)
        }
    });

    if (pseudoExists) {
        res.status(400).json({message: "ce pseudo est déjà pris !"});
        return;
    } else if (emailExists) {
        res.status(400).json({message: "Cet email est déjà pris !"});
        return;
    }

    // Création du user
    bcrypt.hash(body.password, 10)
        .then(hash => {
            const user = {
                pseudo: body.pseudo,
                email: encryptEmail(body.email),
                password: hash,
                isAdmin: false
            };
            sequelize.models.User.create(user)
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(500).json({error}));
        })
        .catch(function (err) {
            res.status(500).json({message: 'Error server'});
            console.error(err);
        });
};

exports.login = (req, res) => {

    sequelize.models.User.findOne({
        where: {
            email: encryptEmail(req.body.email)
        }
    }).then(user => {
        if (!user) {
            return res.status(400).json({message: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(400).json({message: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user.id,
                    pseudo: user.pseudo,
                    isAdmin: user.isAdmin,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.SECRET_TOKEN,
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    }).catch(error => res.status(500).json({error}));
};