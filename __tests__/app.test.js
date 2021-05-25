const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const ShortUrlService = require('../lib/services/ShortUrlService');

describe('shorten-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('create a short url via POST', async () => {
    return request(app)
      .post('/api/v1/shorten')
      .send({ url: 'http://test.com/this/is/very/long' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.stringMatching(/^\w{8}$/),
          originalUrl: 'http://test.com/this/is/very/long'
        });
      });
  });

  it('gets a list of links via GET', async () => {
    const links = await Promise.all(
      [...Array(3)].map((_, i) => ShortUrlService.create({ url: `http://test.com/long/url/${i}` }))
    );

    return request(app)
      .get('/api/v1/shorten')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(links));
      });
  });
});
