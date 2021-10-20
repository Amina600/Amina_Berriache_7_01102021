const db = require('../models');

exports.ctrlLikeDislike = async (req, res, next) => {
    // action = 1 (like) | -1 (dislike) | 0 (suppression)
    let action = req.body.action;
    let userId = req.auth.userId;
    let postId = parseInt(req.params.id);

    // Recherche d'un Like existant associé à ce post et ce user
    const like = await db.sequelize.models.Like.findOne({
        where: {
            postId,
            userId
        }
    })

    // Si Like existe déjà
    if (like) {

        // Si like ou dislike on met à jour
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
        }
        // Si suppression de like => on le supprime
        else {
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

    }
    // Si Like n'existe pas
    else {

        // Si like/dislike on créer un Like
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
        // Si suppression de like => rien
        else {
            res.status(200).json({message: 'Like supprimé'})
        }
    }

}