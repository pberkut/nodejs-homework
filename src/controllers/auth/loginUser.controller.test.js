const request = require('supertest');
const app = require('../../app');
const connectDB = require('../../db/connectDB');

const loginUser = require('./loginUser.controller');

const newUserTest = require('../../../tests/data/usersForTest');

app.post('/users/login', loginUser);

describe('Test POST /users/login loginUser.controller', () => {
  let connect;

  beforeAll(async () => {
    connect = await connectDB;
  });
  afterAll(async () => await connect.disconnect());

  test('User login: status = 200', async () => {
    const response = await request(app)
      .post('/users/login')
      .send(newUserTest)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
    expect(typeof response.body.token).toBe('string');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
