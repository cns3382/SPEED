const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');
//const ArticleSubmission = require('../../models/ArticleSubmission');
const ArticleSubmission = require('../../models/ArticleSubmission');

// Router Tests
router.get('/test', (req, res) => res.send('Sup'));

// Article APIs (Accepted Articles)

// @route GET api/articles/all-articles
// @description Get all articles accepted articles
// @access Public
router.get('/all-articles', (req, res) => {
    Article.find()
        .then(article => res.json(article))
        .catch(err => res.status(404).json({ noarticlesfound: 'No articles found'}))
});

// @route GET api/articles/all-articles/:id
// @description Get a single accepted article
// @access Public
router.get('/all-articles/:id', (req, res) => {
    Article.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(404).json({ noarticlesfound: 'No articles found'}))
});

// @route POST api/articles/all-articles
// @description Adds an accepted article (Usually after moderation AND analysis)
// @access Public
router.post('/all-articles', (req, res) => {
    Article.create(req.body)
        .then(article => res.json({ msg: "Article added sucessfully"}))
        .catch(err => res.status(400).json({ error: "Failed to add article"}));
})

// @router PUT api/articles/all-articles/:id
// @description Updates an already accepted article
// @access Public
router.put('/all-articles/:id', (req, res) => {
    ArticleSubmission.findByIdAndUpdate(req.params.id, req.body)
        .then(ArticleSubmission => res.json({ msg: 'Article Updated'}))
        .catch(err => res.status(400).json({ error: 'Unable to update Article'}));
});

// Article Submission APIs

// @router GET api/articles/article-submissions
// @description Get all article submissions
// @access Public
router.get('/article-submissions', (req, res) => {
    ArticleSubmission.find()
        .then(ArticleSubmission => res.json(ArticleSubmission))
        .catch(err => res.status(404).json({nosubmissionfound: 'No article submissions found'}));
});

// @router GET api/articles/article-submissions/:id
// @description Get a single article to moderate
// @access Public
router.get('/article-submissions/:id', (req, res) => {
    ArticleSubmission.findById(req.params.id)
        .then(ArticleSubmission => res.json(ArticleSubmission))
        .catch(err => res.status(404).json({ nosubmissionfound: "No article submission found"}))
});

// @router POST api/articles/article-submissions
// @description Submit an Article for moderation
// @access Public
router.post('/article-submissions', (req, res) => {
    ArticleSubmission.create(req.body)
        .then(ArticleSubmission => res.json({ msg: "Article submitted successfully"}))
        .catch(err => res.status(400).json({ error: "Article Submission failed"}));
});

// @router PUT(?) api/articles/article-submissions/:id
// @description Updates an article under moderation
// @access Public
router.put('/article-submissions/:id', (req, res) => {
    ArticleSubmission.findByIdAndUpdate(req.params.id, req.body)
        .then(ArticleSubmission => res.json({ msg: 'Article Submission Updated'}))
        .catch(err => res.status(400).json({ error: 'Unable to update Article Submission'}));
});

// @router DELETE(?) api/articles/article-submissions/:id
// @description Deletes an article under moderation (usually when a duplicate submission/already
//              accepted article already exists)
// @access Public
router.delete('/article-submissions/:id', (req, res) => {
    ArticleSubmission.findByIdAndRemove(req.params.id, req.body)
        .then(ArticleSubmission => res.json({ msg : 'Article Submission deleted'}))
        .catch(err => res.status(404).json({ error: 'Article submission not found'}));
});
module.exports = router;