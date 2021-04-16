const { Router } = require("express");
const ensureAuth = require("../middleware/ensureAuth");
const Comment = require('../models/Comment');

module.exports = Router()

    .post('/', ensureAuth, (req, res, next) => {
        Comment.insert({ ...req.body, comment_by: req.user.username })
            .then((comment) => res.send(comment))
            .catch(next);
    })