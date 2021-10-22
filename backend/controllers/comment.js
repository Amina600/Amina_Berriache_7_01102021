const db = require('../models');

// Creation commentaire
exports.postComment = async (req, res, next) => {
    const commentObject = req.body.comment;

    if (commentObject == null) {
        return res.status(400).send({
            message: "Votre message createPost ne peut pas être vide"
        });
    }
    const newComment = {
        ...commentObject,
        userId: req.auth.userId,
    }

    // Enregistrement du nouveau commentaire dans la base de données
    await db.sequelize.models.Comment.create(newComment)
        .then(() => res.status(201).json({message: 'commentaire enregistré !'}))
        .catch(function (err) {
            res.status(500).json({message: 'Error server'});
            console.log(err);
        });
};

//  Récupération de tous les commentaires
exports.getAllComments = async (req, res, next) => {
    const postId = parseInt(req.params.id)

    await db.sequelize.models.Comment.findAll({
        order: [
            ['createdAt', 'ASC'],
        ],
        // Ajout du model User
        include: [
            {model: db.sequelize.models.User, attributes: ['id', 'pseudo', 'profileUrl']},
        ],
        where: {
            postId: postId,
        }
    })
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch((error) => {
            res.status(400).json({error: error});
        });
};

// Suppression du commentaire
exports.deleteComment = async (req, res, next) => {
    const commentId = parseInt(req.params.id)

    await db.sequelize.models.Comment.findOne({
        where: {
            id: commentId
        }
    })
        .then(comment => {
            // Vérification si l'utilisateur est admin ou le créateur du post
            if (!req.auth.isAdmin && comment.userId !== req.auth.userId) {
                res.status(403).json({
                    error: new Error('Action non autorisée !')
                });
                return;
            }
            // Suppression du commentaire
            db.sequelize.models.Comment.destroy({
                where: {
                    id: commentId
                }
            })
                .then(() => res.status(200).json({message: 'Commentaire supprimé supprimé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}
;




