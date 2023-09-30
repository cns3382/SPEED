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
    summary: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    pub_year: {
      type: Date,
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
