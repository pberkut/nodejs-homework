const request = require('supertest');
const fs = require('fs/promises');
const path = require('path');
const app = require('../../app');
const connectDB = require('../../db/connectDB');

const loginUser = require('./loginUser.controller');
const uploadAvatarUser = require('./uploadAvatarUser.controller');

const newUserTest = require('../../../tests/data/usersForTest');
const pathAvatar = path.join(process.cwd(), 'tests', 'data', 'avatar-default.jpg');

// jest.mock('cloudinary');

app.post('/users/login', loginUser);
app.patch('/users/avatars', uploadAvatarUser);

describe('Test POST /users/avatars uploadAvatarUser.controller', () => {
  let connect, token;

  beforeAll(async () => {
    connect = await connectDB;
  });
  afterAll(async () => await connect.disconnect());

  test('User login: get token', async () => {
    const response = await request(app)
      .post('/users/login')
      .send(newUserTest)
      .set('Accept', 'application/json');
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('User update avatar: status 200', async () => {
    const buffer = await fs.readFile(pathAvatar);

    const res = await request(app)
      .patch('/users/avatars')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buffer, 'avatar-default.jpg');

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
  });
});
