const pool = require('../utils/pool');

module.exports = class Comment {
    comment_by;
    post;
    comment;

    constructor(row) {
        this.comment_by = row.comment_by;
        this.post = row.post;
        this.comment = row.comment;
    }

    
}