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

    const newPost = {
        ...postObject,
        urlMedia: req.body.post && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
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
        ],
        include: [
            "User",
            {model: db.sequelize.models.Comment, attributes: []},
            {model: db.sequelize.models.Like, attributes: []},
        ],
        attributes: {
            include: [
                [db.Sequelize.fn("COUNT", db.Sequelize.col('Comments.id')), "commentCount"],
                [db.Sequelize.fn("SUM", db.Sequelize.literal("if(`Likes`.`isLike` = 1, 1, 0)")), "likeCount"],
                [db.Sequelize.fn("SUM", db.Sequelize.literal("if(`Likes`.`isLike` = 0, 1, 0)")), "dislikeCount"],
                [
                    db.Sequelize.fn("SUM",
                    db.Sequelize.literal("if(`Likes`.`isLike` = 1 AND `Likes`.`userId` = "+req.auth.userId+", 1, 0)")),
                    "iLiked"
                ],
                [
                    db.Sequelize.fn("SUM",
                    db.Sequelize.literal("if(`Likes`.`isLike` = 0 AND `Likes`.`userId` = "+req.auth.userId+", 1, 0)")),
                    "iDisliked"
                ],
            ]
        },
        group: ['Post.id']
    })
        .then((newPost) => {
            res.status(200).json(newPost);
        })
};
// Récupérer tous les posts
exports.getAllPostsPopulaire = async (req, res, next) => {

    await db.sequelize.models.Post.findAll({

    })
        .then((newPost) => {
            res.status(200).json(newPost);
        })
};
// Mettre à jour un post
exports.updatePost = async(req, res, next) => {

    // Parser la requete
    const newPost = req.file ?
        {
            ...JSON.parse(req.body.post),
            urlMedia: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...JSON.parse(req.body.post),
            urlMedia: null
        };

    // Retrouver le post
    const post = await db.sequelize.models.Post.findOne({
        where: {
            id: newPost.id,
        }
    })

    if (post.urlMedia) {
        const filename = post.urlMedia.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {});
    }

    post.update(newPost)
        .then(() => {
                res.status(201).json({
                    message: 'Post est à jour !'
                });
            }
        ).catch((error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Suppression une sauce spécifique
exports.deletePost = (req, res, next) => {
    const postId = parseInt(req.params.id)
    db.sequelize.models.Post.findOne({
        where: {
            id: postId,
        }
    })
        .then( post => {

            // Vérification si l'utilisateur est admin ou le créateur du post
            if (!req.auth.isAdmin && post.userId !== req.auth.userId) {
                res.status(403).json({
                    error: new Error('Action non autorisée !')
                });
                return;
            }

            // Suppression du média
            post.destroy()
                .then(() => res.status(200).json({message: 'Post supprimé !'}))
                .catch(error => res.status(400).json({error}));

        })
        .catch(error => res.status(500).json({error}));
};