const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');

//----------POST-------------
// Créer un post et enregistrement dans la base des données
router.post('/', auth, multer, postCtrl.createPost);
//
// Récupérer tous les posts
//router.get('/' + '', auth, postCtrl.getAllPosts);
//
// Mettre à jour un post
 //router.put('/:id', auth, multer, postCtrl.modifyPost);
//
// Suppression un post
 //router.delete('/:id', auth, postCtrl.deletePost);
//


//---------------UPDATE PROFILE -----------


//-------------COMMENTAIRES------------
//Créer un post et enregistrement dans la base des données
//router.post('/', auth, multer, commentCtrl.postComment);
//
// Récupérer tous les commentaires
//router.get('/' + '', auth, commentCtrl.getAllComments);

//// Suppression un commentaire
//router.delete('/:id', auth, commentCtrl.deleteComment);

//------------LIKE/DISLIKE-----------------
// Like & dislike
//router.post('/:id/like', auth, likeCtrl.ctrlLikeDislike);
//
module.exports = router;