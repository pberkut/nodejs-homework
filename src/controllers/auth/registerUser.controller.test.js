/* 
unit-тесты для контроллера входа (register)
- ответ должен иметь статус-код 200
- в ответе должен возвращаться токен
- в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
*/

const express = require('express');
const request = require('supertest');

const registerUser = require('./registerUser.controller');

const app = express();

app.post('/users/register', registerUser);

describe('test POST /users/register registerUser controller', () => {
  beforeAll(() => app.listen(3000));
  // afterAll(() => app.close());

  test('registerUser response return statusCode = 200', async () => {
    const response = await request(app)
      .post('/users/register')
      .field('email', 'para11@mail.com')
      .field('password', 'a12345');
    expect(response.status).toBe(200);
    expect(Object.isObject(response.body)).toBe(true);
    expect(typeof response.body.token).toBe('string');
  });
});
