DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_photo_url TEXT NOT NULL
);

DROP TABLE IF EXISTS postgrams CASCADE;

CREATE TABLE postgrams (
    postgram_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    username TEXT REFERENCES users(github_username) NOT NULL,
    photo_url TEXT NOT NULL,
    caption Text NOT NULL,
    tags TEXT[] NOT NULL
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    comment_by TEXT REFERENCES users(github_username),
    post INT REFERENCES postgrams(postgram_id),
    comment TEXT
)