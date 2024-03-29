const pool = require('../utils/pool');

module.exports = class User {
    username;
    photoURL;

    constructor(row) {
        this.username = row.github_username;
        this.photoURL = row.github_photo_url;
    }

    static async insert({ username, photoURL }) {
        const { rows } = await pool.query(
            'INSERT INTO users (github_username, github_photo_url) VALUES ($1, $2) RETURNING *',
            [username, photoURL]
        );

        return new User(rows[0]);
    }

    static async findByUsername(username) {
        const { rows } = await pool.query('SELECT * FROM users WHERE github_username=$1', [username]);
        if (rows.length < 1) return null;
        return new User(rows[0]);
    }

    static async update({ photoURL, username }) {
        const { rows } = await pool.query(
            'UPDATE users SET github_photo_url=$1 WHERE github_username=$2 RETURNING *', [photoURL, username]);
        return new User(rows[0]);
    }

}
