const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()

    .get('/prolific', (req, res, next) => {
        User.getProlific()
            .then((users) => res.send(users))
            .catch(next);
    })

    .get('/commentleader', (req, res, next) => {
        User.getCommentLeader()
            .then((users) => res.send(users))
            .catch(next);
    })