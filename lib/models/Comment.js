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

    static async insert({ comment_by, post, comment }) {
        const { rows } = await pool.query(
            'INSERT INTO comments (comment_by, post, comment) VALUES ($1, $2, $3) RETURNING *',
            [comment_by, post, comment]
        );
        return new Comment(rows[0]);
    }

    static async delete(id, user) {
        const { rows } = await pool.query(
            'DELETE FROM comments WHERE post=$1 AND comment_by=$2 RETURNING *', [id, user]
        );
        return new Comment(rows[0]);
    }


}