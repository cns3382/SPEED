const mongoose = require('mongoose');

const ArticleSubmissionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    authors: {
        type : String,
        required: true
    },
    doi : {
        type : String,
        required: true
    },
    source: {
        type : String,
        required: true
    },
    pubyear: {
        type : String,
        required: true
    },
    summary : {
        type : String
    },
    name: {
        type : String
    },
    email: {
        type : String
    },
    status: {
        type : String
    }
})
module.exports = Article = mongoose.model('article_submission', ArticleSubmissionSchema);
