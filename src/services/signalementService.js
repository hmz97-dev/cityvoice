const { allowedStatuts } = require('../config');

const signalements = [];

const getNextId = () => {
  if (!signalements.length) return 1;
  return signalements[signalements.length - 1].id + 1;
};

function listSignalements() {
  return signalements;
}

function createSignalement(payload) {
  const nouvelObjet = {
    id: getNextId(),
    titre: payload.titre,
    description: payload.description,
    categorie: payload.categorie,
    latitude: payload.latitude ?? null,
    longitude: payload.longitude ?? null,
    imageUrl: payload.imageUrl ?? null,
    statut: 'en_attente',
    createdAt: new Date(),
  };

  signalements.push(nouvelObjet);
  return nouvelObjet;
}

function updateStatut(id, statut) {
  if (!allowedStatuts.includes(statut)) {
    const error = new Error('Statut non supporte');
    error.code = 'STATUT_INVALID';
    throw error;
  }

  const signalement = signalements.find((item) => item.id === id);
  if (!signalement) return null;

  signalement.statut = statut;
  signalement.updatedAt = new Date();
  return signalement;
}

module.exports = {
  listSignalements,
  createSignalement,
  updateStatut,
};
