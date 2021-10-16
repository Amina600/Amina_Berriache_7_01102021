const db = require('../models');

exports.ctrlLikeDislike = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;

    db.sequelize.models.Like.findOne({_id: req.params.id})
        .then((sauce) => {
            //Si l'user n'a pas déjà liké la sauce ou il n'a pas déjà disliker la sauce, on l'ajoute dans le tableau des usersliked
            if (like === 1 && !sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)){

                Sauce.updateOne(
                    {_id: req.params.id},
                    {$push: {usersLiked: userId}, $inc: {likes: 1}}
                )
                    .then(() => res.status(200).json({ message: "Sauce Likée !"}))
                    .catch(error => res.status(400).json({ error }));

            }
            //Si l'user n'a pas déjà liké la sauce ou il n'a pas déjà disliker la sauce, on l'ajoute dans le tableau des usersdisliked
            else if(like === -1 && !sauce.usersDisliked.includes(userId) && !sauce.usersLiked.includes(userId)) {
                Sauce.updateOne(
                    {_id: req.params.id},
                    {$push: {usersDisliked: userId}, $inc: {dislikes: 1}}
                )
                    .then(() => res.status(200).json({ message: "Sauce Dislikée !"}))
                    .catch(error => res.status(400).json({ error }));

            } else if (like === 0) {
                //Si l'user a un like, et il souhaite retirer son like, on l'enlève du tableau userlsiked
                if(sauce.usersLiked.includes(userId)){
                    Sauce.updateOne(
                        {_id: req.params.id},
                        {$pull: {usersLiked: userId}, $inc: {likes: -1}}
                    )
                        .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
                        .catch(error => res.status(400).json({ error }));

                }
                //Si l'user a un dislike, et il souhaite retirerson dislike, on l'enlève du tableau userdisllsiked
                else if(sauce.usersDisliked.includes(userId)){
                    Sauce.updateOne(
                        {_id: req.params.id},
                        {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}}
                    )
                        .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
                        .catch(error => res.status(400).json({ error }));

                }else {
                    // dans d'autres cas, on renvoie le message d'erreur
                    throw 'Action non autorisée !'
                }
            }else {
                throw 'Action non autorisée !'
            }
        }).catch(error => res.status(400).json({ error }));
}