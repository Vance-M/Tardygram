const pool = require('..utils/pool');

module.exports = class PostGram {
    user;
    photo_url;
    caption;
    tags;

    constructor(row) {
        this.user = row.username;
        this.photoURL = row.photo_url;
        this.caption = row.caption;
        this.tags = row.tags;
    }

    static async insert({ username, photoURL, caption, tags }) {
        const { rows } = await pool.query(
            'INSERT INTO posts (username, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, photoURL, caption, tags]);
        return new PostGram(rows[0]);
    }

}

