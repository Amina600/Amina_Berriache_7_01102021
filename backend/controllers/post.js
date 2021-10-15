const db = require('../models');
// file system donne accès aux fonctions qui permettent de modifier le système de fichiers
const fs = require('fs');

// Créer un post et enregistrement dans la base des données
exports.createPost = async (req, res, next) => {

    const postObject = JSON.parse(req.body.post);
    if (postObject == null) {
        return res.status(400).send({
            message: "Votre message createPost ne peut pas être vide"
        });
    }
    console.log(postObject);

    const newPost = {
        ...postObject,
        urlMedia: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    };

    //Enregistre le post dans la base de données
    await db.sequelize.models.Post.create(newPost)
        .then(() => res.status(201).json({message: 'Post enregistré !'}))
        .catch(function (err) {
            res.status(500).json({message: 'Error server'});
            console.log(err);
        });
};

// Récupérer tous les posts
exports.getAllPosts = async (req, res, next) => {
    await db.sequelize.models.Post.findAll({
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then((newPost) => {
            res.status(200).json(newPost);
        })
        .catch((error) => {
            res.status(400).json({error: error});
        });
};

// Mettre à jour un post
/*exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    //Sauce.update({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    db.sequelize.models.Post.update({
        where: {
            id: req.body.id,
        }
    })
        .then(() => {
                res.status(201).json({
                    message: 'Post updated successfully!'
                });
            }
        ).catch((error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};*/

//Suppression une sauce spécifique
exports.deletePost = (req, res, next) => {
    db.sequelize.models.Post.destroy({
        where: {
            id: req.body.id,
        }
    })
        .then(newPost => {
            const filename = newPost.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.sequelize.models.Post.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                    .then(() => res.status(200).json({message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};