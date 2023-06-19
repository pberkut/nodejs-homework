require('dotenv').config();
const request = require('supertest');
const { connectDB } = require('../../../db/connectDB');
const { User } = require('../../../models/User');
const { app } = require('../../../app');

const { TEST_DB_URL } = process.env;
const loginRoute = '/auth/login';

describe('login controller', () => {
  const validUser = { email: 'test@mail.com', password: 'Admin123' };
  let createdUser;

  beforeAll(async () => {
    // establish test-db connection
    await connectDB(TEST_DB_URL);

    // seed db with user
    createdUser = await User.create(validUser);
  });

  afterAll(async () => {
    // remove created user
    await User.findByIdAndDelete(createdUser._id);
  });

  describe('body validation', () => {
    describe('email validation', () => {
      it('return 401 unauthorized, if email is not provided', async () => {
        const invalidData = { password: 'Admin123' };
        const res = await request(app).post(loginRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });

      it('return 401 unauthorized, if email is not a valid email', async () => {
        const invalidData = { email: 'testtest' };
        const res = await request(app).post(loginRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });
    });

    describe('password validation', () => {
      it('return 401 unauthorized, if password is not provided', async () => {
        const invalidData = { email: 'test@mail.com' };
        const res = await request(app).post(loginRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });

      it('return 401 unauthorized, if password is not valid', async () => {
        // at least 8 char, one number, one uppercase letter
        const invalidData = { email: 'test@mail.com', password: 'admin' };
        const res = await request(app).post(loginRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });
    });
  });

  describe('authentication', () => {
    it('return 401 if user with provided email does not exist', async () => {
      const invalidData = {
        email: 'doesNotExist@mail.com',
        password: 'Admin123',
      };
      const res = await request(app).post(loginRoute).send(invalidData);

      expect(res.status).toEqual(401);
    });

    it('return 401 if provided password is not correct', async () => {
      const invalidData = {
        email: createdUser.email,
        password: 'AAAAdmin123123',
      };
      const res = await request(app).post(loginRoute).send(invalidData);

      expect(res.status).toEqual(401);
    });

    it('return 200, and token in response if credentials are correct', async () => {
      const res = await request(app)
        .post(loginRoute)
        .send({ email: validUser.email, password: validUser.password });

      expect(res.status).toEqual(200);
      expect(res.body.token).toBeTruthy();
    });
  });
});
