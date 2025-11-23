const path = require('path');
require('dotenv').config();

const ROOT_DIR = path.resolve(__dirname, '..');

module.exports = {
  port: process.env.PORT || 4000,
  uploadsDir: path.join(ROOT_DIR, 'uploads'),
  jwtSecret: process.env.JWT_SECRET || 'change-me-cityvoice-secret',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@cityvoice.local',
  adminPassword: process.env.ADMIN_PASSWORD || 'changeme123',
  allowedStatuts: ['en_attente', 'en_cours', 'resolu', 'rejete'],
};
