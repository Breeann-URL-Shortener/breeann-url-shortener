const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const ShortUrlService = require('../lib/services/ShortUrlService');
const UserService = require('../lib/services/UserService');

describe('shorten-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('create a short url via POST', async () => {
    const agent = request.agent(app);

    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password'
    });
    
    // console.log(user.id);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });

    const res = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'bbb',
        userId: user.id,
        url: 'http://test.com/this/is/very/long'
      });


    expect(res.body).toEqual({
      id: expect.any(String),
      originalUrl: 'http://test.com/this/is/very/long', 
      userId: 1
    });
    
  });


  // it('gets a list of links via GET', async () => {
  //   await UserService.create({
  //     email: 'test@test.com',
  //     password: 'password'
  //   });

  //   const links = await Promise.all(
  //     [...Array(3)].map((_, i) => ShortUrlService.create({ url: `http://test.com/long/url/${i}` }))
  //   ).catch();

  //   return request(app)
  //     .get('/api/v1/shorten')
  //     .then(res => {
  //       expect(res.body).toEqual(expect.arrayContaining(links));
  //     });
  // });
});
