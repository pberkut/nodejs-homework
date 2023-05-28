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

describe('test registerUser controller', () => {
  beforeAll(() => app.listen(3000));
  afterAll(() => app.close());

  test('registerUser response return statusCode = 200', async () => {
    const response = await request(app).post('/users/register');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
