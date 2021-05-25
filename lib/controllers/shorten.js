const { Router } = require('express');
const ShortUrl = require('../models/ShortUrl');
const ShortUrlService = require('../services/ShortUrlService');

module.exports = Router()
  .post('/', (req, res, next) => {
    ShortUrlService
      .create(req.body)
      .then(shortUrl => res.send(shortUrl))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    ShortUrl
      .find()
      .then(shortUrls => res.send(shortUrls))
      .catch(next);
  });
