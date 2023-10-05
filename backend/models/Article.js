const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    se_practice: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    authors: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    pubyear: {
      type: Date,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    claim: {
      type: String,
    },
    evidence: {
      type: String,
    },
    result: {
      type: String,
    }
})
module.exports = Article = mongoose.model('article', ArticleSchema);
