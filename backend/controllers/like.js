const db = require('../models');

exports.ctrlLikeDislike = async (req, res, next) => {
    let action = req.body.action; // peut etre -1 , 0 ou 1
    let userId = req.auth.userId;
    let postId = parseInt(req.params.id);

    const like = await db.sequelize.models.Like.findOne({
        where: {
            postId,
            userId
        }
    })
    // Si "like/dislike" existe, on le met à jour
    if (like) {
        if (action === 1 || action === -1) {
            let value = {
                isLike: action === 1
            };
            like.update(value)
                .then(() => res.status(201).json({message: 'Like est à jour !'}))
                .catch(function (err) {
                    res.status(500).json({message: 'Error server'});
                    console.log(err);
                });

            // Sinon, on le supprime !
        } else {
            db.sequelize.models.Like.destroy({
                where: {
                    id: like.id
                }
            })
                .then(() => res.status(201).json({message: 'Like Supprimé !'}))
                .catch(function (err) {
                    res.status(500).json({message: 'Error server'});
                    console.log(err);
                });
        }
        // Si "like/dislike" n'existe pas, on l'ajoute dans la table des likes
    } else {
        if (action === 1 || action === -1) {
            let newLike = {
                isLike: action === 1,
                postId,
                userId
            };
            db.sequelize.models.Like.create(newLike)
                .then(() => res.status(201).json({message: 'Like crée !'}))
                .catch(function (err) {
                    res.status(500).json({message: 'Error server'});
                    console.log(err);
                });

        }
        else {
            res.status(200).json({message: 'Like supprimé'})
        }
    }

}