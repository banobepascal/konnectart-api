/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// import mongoose from 'mongoose';
import request from 'supertest';
import User from '../api/models/user';
import mockData from './utils/mockData';

let server;
describe('api/auth', () => {
  beforeEach(() => {
    server = require('../server');
  });
  afterAll(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe('POST /signup', () => {
    let firstname;
    let lastname;
    let username;
    let email;
    let password;
    let confirmPassword;
    let isArtist;
    let isAdmin;

    const exec = async () => request(server).post('/api/auth/signup').send({
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
      isArtist,
      isAdmin,
    });

    beforeEach(() => {
      (firstname = 'Chris'),
      (lastname = 'Evans'),
      (username = 'chrisevans'),
      (email = 'chris@test.com'),
      (password = 'Chrisevanstest1!'),
      (confirmPassword = 'Chrisevanstest1!'),
      (isArtist = false),
      (isAdmin = false);
    });

    it('should signup user on success', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });
    it('should return 400 if firstname is not a valid string', async () => {
      firstname = '1';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if lastname is not a valid string', async () => {
      lastname = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if username is not a valid string', async () => {
      username = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if email is not in valid format', async () => {
      email = 'amm.com';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if password is not strong', async () => {
      password = 'Chris';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if passwords do not match', async () => {
      confirmPassword = 'Chrisevans';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if isArtist is not boolean', async () => {
      isArtist = null;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if isAdmin is not boolean', async () => {
      isAdmin = null;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 409 if username is already taken', async () => {
      username = 'chrisevans';
      const res = await exec();
      expect(res.status).toBe(409);
    });
    it('should return 409 if email is already taken', async () => {
      email = 'chris@test.com';
      const res = await exec();
      expect(res.status).toBe(409);
    });
  });
});
