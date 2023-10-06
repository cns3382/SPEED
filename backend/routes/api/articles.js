const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');

// Router Test
router.get('/test', (req, res) => res.send('Sup'));

// @route GET api/books
// @description Get all articles 
// @access Public
router.get('/', (req, res) => {
    Article.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(404).json({ noarticlesfound: 'No articles found'}))
});

module.exports = router;