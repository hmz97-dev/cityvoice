const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { listSignalements } = require('../services/signalementService');
const adminService = require('../services/adminService');
const { updateStatutController } = require('./signalementController');

const issueToken = (admin) =>
  jwt.sign(
    {
      role: 'admin',
      email: admin.email,
      id: admin.id,
    },
    jwtSecret,
    { expiresIn: '2h' },
  );

function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email et password sont obligatoires' });
  }

  try {
    const admin = adminService.createAdmin(email, password);
    return res.status(201).json({
      token: issueToken(admin),
      admin: { id: admin.id, email: admin.email },
    });
  } catch (error) {
    if (error.code === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: 'Email deja utilise' });
    }
    return res.status(500).json({ message: 'Erreur interne' });
  }
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email et password sont obligatoires' });
  }

  const admin = adminService.validateAdmin(email, password);
  if (!admin) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  return res.json({
    token: issueToken(admin),
    admin: { id: admin.id, email: admin.email },
    expiresIn: '2h',
  });
}

function listAdminSignalements(req, res) {
  return res.json(listSignalements());
}

module.exports = {
  register,
  login,
  listAdminSignalements,
  updateStatutController,
};
