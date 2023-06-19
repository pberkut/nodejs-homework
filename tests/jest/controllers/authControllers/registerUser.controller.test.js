const request = require('supertest');
const app = require('../../app');
const connectDB = require('../../db/connectDB');

const registerUser = require('./registerUser.controller');

const newUserTest = require('../../../tests/data/usersForTest');

app.post('/users/register', registerUser);

describe('Test POST /users/register registerUser.controller', () => {
  let connect;

  beforeAll(async () => {
    connect = await connectDB;
  });
  afterAll(async () => await connect.disconnect());

  test('User register: status = 201', async () => {
    const response = await request(app)
      .post('/users/register')
      .send(newUserTest)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
    expect(response.body).toHaveProperty('user');
  });

  it('User register with exist email: status 409', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(newUserTest)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('message');
  });
});
