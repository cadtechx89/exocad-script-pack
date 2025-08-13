const express = require('express');
const { generateMods } = require('../controllers/modController');

const router = express.Router();

router.post('/generate', generateMods);

module.exports = router;