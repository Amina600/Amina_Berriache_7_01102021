const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const profileCtrl = require('../controllers/profile')

//---------------UPDATE PROFILE -----------
// Update photo de profile
router.put('/image', auth, multer, profileCtrl.postPhoto);

// Update pseudo de l'utilisateur
router.put('/pseudo', auth, profileCtrl.updatePseudo);

// Update password de l'utilisateur
router.put('/password', auth, profileCtrl.updatePassword);

// Suppression le compte user
router.delete('/delete', auth, profileCtrl.deleteCompte);

module.exports = router;