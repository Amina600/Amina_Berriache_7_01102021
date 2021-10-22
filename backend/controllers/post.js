const db = require('../models');
const fs = require('fs');

// Créer un post et enregistrement dans la table de Posts
exports.createPost = async (req, res, next) => {
   // Parser la requête
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

    //Enregistrement du post
    await db.sequelize.models.Post.create(newPost)
        .then(() => res.status(201).json({message: 'Post enregistré !'}))
        .catch(function (err) {
            res.status(500).json({message: 'Error server'});
            console.log(err);
        });
};

// Récupérer tous les posts (populaire ou récent)
exports.getAllPosts = async (req, res, next) => {

    const category = req.params.category;

    // order change en fonction de category
    let order;
    if (category === 'RECENT') {
        order = ['createdAt', 'DESC'];  // En fonction de la date de création
    }
    else if (category === 'POPULAIRE') {
        order = [db.Sequelize.literal('likeCount'), 'DESC']; // En fonction du nombre de likes
    }

    const comments = await db.sequelize.models.Comment.findAll({});

    db.sequelize.models.Post.findAll({
        order: [
            order,
        ],
        include: [
            {model: db.sequelize.models.User, attributes: ['id', 'pseudo', 'profileUrl']},
            {model: db.sequelize.models.Like, attributes: []},
        ],
        attributes: {
            include: [
                // Compte le nombre de likes
                [db.Sequelize.fn("SUM", db.Sequelize.literal("if(`Likes`.`isLike` = 1, 1, 0)")), "likeCount"],
                // Compte le nombre de dislikes
                [db.Sequelize.fn("SUM", db.Sequelize.literal("if(`Likes`.`isLike` = 0, 1, 0)")), "dislikeCount"],
                // Ajoute un champs "iLiked" = 0 (l'utilisateuu n'a pas like ce post) | 1 (l'utilisateur a déjà like)
                [
                    db.Sequelize.fn("SUM",
                    db.Sequelize.literal("if(`Likes`.`isLike` = 1 AND `Likes`.`userId` = "+req.auth.userId+", 1, 0)")),
                    "iLiked"
                ],
                // Ajoute un champs "iDisliked" = 0 (l'utilisateuu n'a pas dislike ce post) | 1 (l'utilisateur a déjà dislike)
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
            // Ajoute commentCount pour chaque post en filtrant les comments
            newPost = newPost.map((post) => {
                post.dataValues.commentCount = comments.filter((comment) => comment.postId === post.id).length;
                return post;
            })
            res.status(200).json(newPost);
        })
};

// Mettre à jour un post
exports.updatePost = async(req, res, next) => {

    // Parser la requête
    let newPost = JSON.parse(req.body.post);

    // Retrouver le post
    const post = await db.sequelize.models.Post.findOne({
        where: {
            id: newPost.id,
        }
    })

    // Ajouter le nouveau urlMedia ou supprimer l'urlMedia si 'deleteFile' dans la requête
    let deleteMedia;

    // Si nouveau file
    if (req.file) {
        newPost.urlMedia = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        deleteMedia = true;
    }
    // Si le user demande de supprimer le media
    else if (newPost.deleteFile) {
        newPost.urlMedia = null;
        deleteMedia = true;
    }
    delete newPost.deleteFile;

    // Supprimer l'ancien fichier si nécessaire
    if (deleteMedia && post.urlMedia) {
        const filename = post.urlMedia.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {});
    }

    // Mise à jour du Post
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

//Suppression d'un post
exports.deletePost = async (req, res, next) => {
    // Récupération l'id du post
    const postId = parseInt(req.params.id)
    // Retrouver le post dans la table
    await db.sequelize.models.Post.findOne({
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
            // Suppression du post (le media associé serra supprimé par un hook)
            post.destroy()
                .then(() => res.status(200).json({message: 'Post supprimé !'}))
                .catch(error => res.status(400).json({error}));

        })
        .catch(error => res.status(500).json({error}));
};