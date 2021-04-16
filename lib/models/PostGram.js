const pool = require('../utils/pool');

module.exports = class PostGram {
    username;
    photo_url;
    caption;
    tags;

    constructor(row) {
        this.postgram_id = row.postgram_id;
        this.username = row.username;
        this.photoURL = row.photo_url;
        this.caption = row.caption;
        this.tags = row.tags;
    }

    static async insert({ username, photoURL, caption, tags }) {
        const { rows } = await pool.query(
            'INSERT INTO postgrams (username, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, photoURL, caption, tags]);
        return new PostGram(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM postgrams',
            []
        );
        return rows.map((row) => new PostGram(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            postgrams.postgram_id, postgrams.username, comments.comment_by, comments.comment
            FROM postgrams 
            INNER JOIN comments 
            ON postgrams.postgram_id=comments.post 
            WHERE postgram_id=$1`,
            [id]
        );
        return rows;
    }

    static async updateCaption(id, {caption, username}) {
        const { rows } = await pool.query(
            `UPDATE 
            postgrams 
            SET caption=$1
            WHERE postgram_id=$2
            AND username=$3
            RETURNING *`,
            [caption, id, username]
        )
        return new PostGram(rows[0])
    }

    static async deletePost(id, {username}) {
        const { rows } = await pool.query(
            `DELETE FROM
            postgrams
            WHERE postgram_id=$1
            AND username=$2
            RETURNING *`,
            [id, username]
        )
        return new PostGram(rows[0])
    }
}

