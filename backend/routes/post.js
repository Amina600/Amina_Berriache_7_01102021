const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

//----------POST-------------
// Créer un post et enregistrement dans la base des données
// router.post('/', auth, multer, postCtrl.createSauce);
//
// Récupérer un post
// router.get('/:id', auth, postCtrl.getOneSauce);
//
// Mettre à jour un post
// router.put('/:id', auth, multer, postCtrl.modifySauce);
//
// Suppression un post
// router.delete('/:id', auth, postCtrl.deleteSauce);
//
// Récupérer tous les posts
// router.get('/' + '', auth, postCtrl.getAllSauce);

//---------------UPDATE PROFILE -----------


//-------------COMMENTAIRES------------
// Récupérer tous les commentaires
// // router.get('/' + '', auth, sauceCtrl.getAllSauce);

// Récupérer un commentaire
// router.get('/:id', auth, sauceCtrl.getOneSauce);

//// Suppression un commentaire
// // router.delete('/:id', auth, sauceCtrl.deleteSauce);

//------------LIKE/DISLIKE-----------------
// Like & dislike
// router.post('/:id/like', auth, sauceCtrl.ctrlLikeDislike);
//
// module.exports = router;