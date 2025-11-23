const express = require('express');
const signalementController = require('../controllers/signalementController');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', signalementController.getAll);
router.post('/', upload.single('image'), signalementController.create);

module.exports = router;
