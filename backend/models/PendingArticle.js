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
    source: {
        type : String,
        required: true
    },
    pubYear: {
        type : String,
        required: true
    },
    doi : {
        type : String,
    },
    summary : {
        type : String
    }
})
module.exports = Article = mongoose.model('articleSubmission', ArticleSubmissionSchema);
