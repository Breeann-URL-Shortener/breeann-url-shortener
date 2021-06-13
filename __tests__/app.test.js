const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
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
      userId: user.id
    });
    
  });


  it('gets a list of links via GET', async () => {
    const agent = request.agent(app);

    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });

    const linkOne = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'bbb',
        userId: user.id,
        url: 'http://test.com/this/is/very/long'
      });

    const linkTwo = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'ccc',
        userId: user.id,
        url: 'http://test.com/this/is/very/long/taketwo'
      });

    const linkThree = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'ddd',
        userId: user.id,
        url: 'http://test.com/this/is/very/long/takethree'
      });

    return agent
      .get('/api/v1/shorten')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([linkOne.body, linkTwo.body, linkThree.body]));
      });
  });

  it('gets a list of links via GET by User', async () => {
    const agent = request.agent(app);

    const user = await UserService.create({
      email: 'test3@test3.com',
      password: 'password3'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test3@test3.com',
        password: 'password3'
      });

    console.log(user);

    const linkOne = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'bbb',
        userId: user.id,
        url: 'http://test.com/this/is/very/long'
      });

    const linkThree = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'ddd',
        userId: user.id,
        url: 'http://test.com/this/is/very/long/takethree'
      });

    return agent
      .get(`/api/v1/shorten/${user.id}`)
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([linkOne.body, linkThree.body]));
      });
  });


  it('gets deletes a Link by id', async () => {
    const agent = request.agent(app);

    const user = await UserService.create({
      email: 'test3@test3.com',
      password: 'password3'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test3@test3.com',
        password: 'password3'
      });

    const linkOne = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'bbb',
        userId: user.id,
        url: 'http://test.com/this/is/very/long'
      });

    const linkTwo = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'fff',
        userId: user.id,
        url: 'http://test.com/this/is/very/long/taketwo'
      });

    const linkThree = await agent
      .post('/api/v1/shorten/')
      .send({
        id: 'ddd',
        userId: user.id,
        url: 'http://test.com/this/is/very/long/takethree'
      });

    console.log(linkTwo.body, 'linkTwo');
    await agent
      .delete(`/api/v1/shorten/${linkTwo.body.id}`)
    ;

    return agent
      .get(`/api/v1/shorten/${user.id}`)
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([linkOne.body, linkThree.body]));
      });
  });

});
