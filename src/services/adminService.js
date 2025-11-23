const bcrypt = require('bcryptjs');
const { adminEmail, adminPassword } = require('../config');

const admins = [];
let nextId = 1;

function findByEmail(email) {
  return admins.find((admin) => admin.email.toLowerCase() === email.toLowerCase());
}

function createAdmin(email, password) {
  if (findByEmail(email)) {
    const error = new Error('Email deja utilise');
    error.code = 'EMAIL_EXISTS';
    throw error;
  }

  const admin = {
    id: nextId++,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    createdAt: new Date(),
  };

  admins.push(admin);
  return admin;
}

function validateAdmin(email, password) {
  const admin = findByEmail(email);
  if (!admin) return null;

  const isValid = bcrypt.compareSync(password, admin.passwordHash);
  return isValid ? admin : null;
}

function seedDefaultAdmin() {
  if (!adminEmail || !adminPassword) return;
  const already = findByEmail(adminEmail);
  if (!already) {
    createAdmin(adminEmail, adminPassword);
  }
}

seedDefaultAdmin();

module.exports = {
  createAdmin,
  validateAdmin,
};
