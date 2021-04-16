const { Router } = require('express');
const { Body } = require('node-fetch');
const ensureAuth = require('../middleware/ensureAuth');
const PostGram = require('../models/PostGram');

module.exports = Router()

    .post('/', ensureAuth, (req,res,next) => {
        PostGram.insert({...req.body, username: req.user.username})
        .then((post) => res.send(post))
        .catch(next);
    })

    .get('/', (req, res, next) => {
        PostGram.getAll()
        .then((post) => res.send(post))
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        PostGram.getById(req.params.id)
        .then((post) => res.send(post))
        .catch(next)
    })

    .patch('/:id', ensureAuth, (req, res, next) => {
        PostGram.updateCaption(req.params.id, {...req.body, username: req.user.username})
        .then((post) => res.send(post))
        .catch(next);
    })

    .delete('/:id', ensureAuth, (req, res, next) => {
        PostGram.deletePost(req.params.id, {username: req.user.username})
        .then((post) => res.send(post))
        .catch(next);
    })