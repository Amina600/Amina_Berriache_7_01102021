//Les tokens d'authentification permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
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