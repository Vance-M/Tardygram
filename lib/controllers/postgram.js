const { Router } = require('express');
const PostGram = require('../models/PostGram');

module.exports = Router()

    .post('/', (req,res,next) => {
        PostGram.insert(req.body)
        .then((post) => res.send(post))
        .catch(next);
    })

