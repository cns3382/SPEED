const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');

// Router Test
router.get('/test', (req, res) => res.send('Sup'));

module.exports = router;