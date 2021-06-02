const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const ShortUrl = require('../models/ShortUrl');
const ShortUrlService = require('../services/ShortUrlService');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    ShortUrlService
      .create({ ...req.body, userId: req.user.id })
      .then(shortUrl => res.send(shortUrl))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    ShortUrl
      .find()
      .then(shortUrls => res.send(shortUrls))
      .catch(next);
  })

  .get('/:userId', (req, res, next) => {
    ShortUrl
      .findAllUrlsByUser(req.user.id)
      .then(shortUrl => res.redirect(shortUrl.originalUrl))
      .catch(next);
  });
