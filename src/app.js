const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const { uploadsDir } = require('./config');
const signalementRoutes = require('./routes/signalementRoutes');
const adminRoutes = require('./routes/adminRoutes');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => {
  res.send('API CityVoice OK');
});

app.use('/signalements', signalementRoutes);
app.use('/admin', adminRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err?.message === 'Type de fichier non supporte') {
    return res.status(400).json({ message: err.message });
  }
  return next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

module.exports = app;
