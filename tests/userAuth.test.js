import request from 'supertest';
import User from '../api/models/user';

let server;
describe('api/auth/user', () => {
  beforeEach(() => {
    server = require('../server');
  });
  afterAll(async () => {
    await User.deleteMany({});
    await server.close();
  });

  let username;
  let email;
  let password;
  let confirmPassword;
  let isAdmin;

  const execSignup = async () => request(server).post('/api/auth/user/signup').send({
    username,
    email,
    password,
    confirmPassword,
    isAdmin,
  });

  beforeEach(() => {
    (username = 'chrispratt'),
    (email = 'chrispratt@test.com'),
    (password = 'Chrispratttest1!'),
    (confirmPassword = 'Chrispratttest1!');
    (isAdmin = false);
  });
  describe('POST /signup', () => {
    it('should signup user on success', async () => {
      const res = await execSignup();
      expect(res.status).toBe(201);
    });
    it('should return 400 if username is not a valid string', async () => {
      username = '';
      const res = await execSignup();
      expect(res.status).toBe(400);
    });
    it('should return 400 if email is not in valid format', async () => {
      email = 'amm.com';
      const res = await execSignup();
      expect(res.status).toBe(400);
    });
    it('should return 400 if password is not strong', async () => {
      password = 'Chris';
      const res = await execSignup();
      expect(res.status).toBe(400);
    });
    it('should return 400 if passwords do not match', async () => {
      confirmPassword = 'Chrisevans';
      const res = await execSignup();
      expect(res.status).toBe(400);
    });
    it('should return 400 if isAdmin is not boolean', async () => {
      isAdmin = null;
      const res = await execSignup();
      expect(res.status).toBe(400);
    });
    it('should return 409 if username is already taken', async () => {
      username = 'chrispratt';
      const res = await execSignup();
      expect(res.status).toBe(409);
    });
    it('should return 409 if email is already taken', async () => {
      email = 'chrispratt@test.com';
      const res = await execSignup();
      expect(res.status).toBe(409);
    });
  });

  describe('POST /signin', () => {
    const execSignin = async () => request(server).post('/api/auth/user/signin').send({
      username,
      password,
    });
    it('should sign-in user on success', async () => {
      username = 'chrispratt';
      password = 'Chrispratttest1!';
      const res = await execSignin();
      expect(res.status).toBe(200);
    });
    it('should not sign-in user on invalid username', async () => {
      username = 'chrisevan';
      password = 'Chrispratttest1!';
      const res = await execSignin();
      expect(res.status).toBe(404);
    });
    it('should sign-in user on wrong password', async () => {
      username = 'chrispratt';
      password = 'Chrisevanstest';
      const res = await execSignin();
      expect(res.status).toBe(404);
    });
  });
});
