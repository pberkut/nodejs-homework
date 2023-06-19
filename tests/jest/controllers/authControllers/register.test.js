process.env.NODE_ENV = 'test';

require('dotenv').config();
const request = require('supertest');
const { connectDB } = require('../../../db/connectDB');
const { User } = require('../../../models/User');
const { app } = require('../../../app');

const { TEST_DB_URL } = process.env;
const registerRoute = '/auth/register';

describe('register controller', () => {
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
        const res = await request(app).post(registerRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });

      it('return 401 unauthorized, if email is not a valid email', async () => {
        const invalidData = { email: 'testtest' };
        const res = await request(app).post(registerRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });
    });

    describe('password validation', () => {
      it('return 401 unauthorized, if password is not provided', async () => {
        const invalidData = { email: 'test@mail.com' };
        const res = await request(app).post(registerRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });

      it('return 401 unauthorized, if password is not valid', async () => {
        // at least 8 char, one number, one uppercase letter
        const invalidData = { email: 'test@mail.com', password: 'admin' };
        const res = await request(app).post(registerRoute).send(invalidData);

        expect(res.status).toEqual(422);
      });
    });
  });

  describe('registration', () => {
    let registeredUser;

    it('return 409 if email is not unique', async () => {
      const res = await request(app)
        .post(registerRoute)
        .send({ email: validUser.email, password: validUser.password });

      expect(res.status).toEqual(409);
    });

    it('return 201, and created user if body is valid, and email is unique', async () => {
      const uniqueUser = { email: 'test1@mail.com', password: 'Admin123' };

      const res = await request(app).post(registerRoute).send(uniqueUser);

      expect(res.status).toEqual(201);
      expect(res.body.user.email).toEqual(uniqueUser.email);

      registeredUser = res.body.user;
    });

    afterAll(async () => {
      // delete registered user from db
      await User.findByIdAndDelete(registeredUser._id);
    });
  });
});
