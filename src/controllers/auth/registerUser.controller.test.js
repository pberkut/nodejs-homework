/* 
unit-тесты для контроллера входа (register)
- ответ должен иметь статус-код 200
- в ответе должен возвращаться токен
- в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
*/

const request = require('supertest');
const app = require('../../app');
const connectDB = require('../../db/connectDB');

const registerUser = require('./registerUser.controller');

const newUserForRegisterController = require('../../../tests/data/usersForRegister');

app.post('/users/register', registerUser);

describe('Test POST /users/register registerUser controller', () => {
  let connect;

  beforeAll(async () => {
    connect = await connectDB;
  });
  afterAll(() => connect.disconnect());

  test('User register: status = 201', async () => {
    const response = await request(app)
      .post('/users/register')
      .send(newUserForRegisterController)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
    expect(response.body).toHaveProperty('user');
  });

  it('User register with exist email: status 409', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(newUserForRegisterController)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('message');
  });
});
