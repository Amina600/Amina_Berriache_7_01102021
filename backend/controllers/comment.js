const db = require('../models');

exports.postComment = async (req, res, next) => {
    console.log(req.body)
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

//Enregistre le post dans la base de données
    await db.sequelize.models.Comment.create(newComment)
        .then(() => res.status(201).json({message: 'commentaire enregistré !'}))
        .catch(function (err) {
            res.status(500).json({message: 'Error server'});
            console.log(err);
        });
};

exports.getAllComments = async (req, res, next) => {
    const postId = parseInt(req.params.id)
    await db.sequelize.models.Comment.findAll({
        order: [
            ['createdAt', 'ASC'],
        ],
        include: [
            "User"
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

exports.deleteComment = (req, res, next) => {
    const commentId = parseInt(req.params.id)
    db.sequelize.models.Comment.findOne({
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
            // Suppression du média
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




