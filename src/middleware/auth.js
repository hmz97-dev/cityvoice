const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token requis' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ message: 'Format d\'autorisation invalide' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.admin = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expire' });
  }
}

module.exports = authenticateAdmin;
