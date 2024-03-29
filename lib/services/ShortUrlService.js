const chance = require('chance').Chance();
const ShortUrl = require('../models/ShortUrl');

module.exports = class ShortUrlService {
  static create({ url, userId }) {
    // create a random id using change-

    const id = chance.string({
      length: 8,
      alpha: true,
      numeric: true,
      symbols: false,
      casing: 'lower'
    });
    // insert new shortUrl into database
    return ShortUrl.insert({
      id,
      originalUrl: url,
      userId
    });
  }

  static delete(id) {
    console.log(id);
    // insert new shortUrl into database
    return ShortUrl.deleteUrlById(id);
  }
};
