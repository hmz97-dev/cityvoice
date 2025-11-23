const {
  listSignalements,
  createSignalement,
  updateStatut,
} = require('../services/signalementService');

const buildImageUrl = (req) => (req.file ? `/uploads/${req.file.filename}` : null);

function getAll(req, res) {
  return res.json(listSignalements());
}

function create(req, res) {
  const { titre, description, categorie, latitude, longitude } = req.body;

  if (!titre || !description || !categorie) {
    return res
      .status(400)
      .json({ message: 'titre, description et categorie sont obligatoires.' });
  }

  const signalementCree = createSignalement({
    titre,
    description,
    categorie,
    latitude: latitude ? Number(latitude) : null,
    longitude: longitude ? Number(longitude) : null,
    imageUrl: buildImageUrl(req),
  });

  return res.status(201).json(signalementCree);
}

function updateStatutController(req, res) {
  const { statut } = req.body;
  const id = Number(req.params.id);

  if (!statut) {
    return res.status(400).json({ message: 'Le statut est requis' });
  }

  try {
    const maj = updateStatut(id, statut);
    if (!maj) {
      return res.status(404).json({ message: 'Signalement introuvable' });
    }

    return res.json(maj);
  } catch (error) {
    if (error.code === 'STATUT_INVALID') {
      return res
        .status(400)
        .json({ message: 'Statut invalide', details: 'Utilisez un statut autorise' });
    }
    return res.status(500).json({ message: 'Erreur interne' });
  }
}

module.exports = {
  getAll,
  create,
  updateStatutController,
};
