const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération token envoyé par le front
        const token = req.headers.authorization.split(' ')[1];
        // Vérification si le token est identique à le secret token
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        // Ajout d'informations sur le user dans la requête pour les controllers
        req.auth = {
            userId: decodedToken.userId,
            isAdmin: !!decodedToken.isAdmin
        }
        next()
    } catch {
        res.status(403).json({
            error: new Error('Not authenticated')
        });
    }
};