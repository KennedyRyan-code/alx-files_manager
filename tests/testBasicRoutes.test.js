/* eslint-disable jest/no-test-return-statement */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/valid-expect */
import request from 'supertest';
import { app } from '../server';

const { expect } = require('chai');

describe('basic Routes', () => {
  describe('gET /status', () => {
    it('should return status 200', () => request(app)
      .get('/status')
      .then((response) => {
        expect(response.status).to.be.equal(200);
      }));
  });

  describe('gET /stats', () => {
    it('should return status 200', () => request(app)
      .get('/stats')
      .then((response) => {
        expect(response.status).to.be.equal(200);
      }));
  });

  describe('pOST /users', () => {
    it('should create a new user', () => {
      const userData = {
        email: 'Newdoe@example.com',
        password: 'password123',
      };

      return request(app)
        .post('/users')
        .send(userData)
        .then((response) => {
          expect(response.statusCode).to.be.equal(201);
        });
    });
  });

  describe('gET /connect', () => {
    it('should connect to the server', () => {
      const userData = {
        email: 'johndoe@example.com',
        password: 'password123',
      };
      const auth = Buffer.from(`${userData.email}:${userData.password}`).toString('base64');
      return request(app)
        .get('/connect')
        .set('Authorization', `Basic ${auth}`)
        .then((response) => {
          expect(response.statusCode).to.be.equal(200);
        });
    });
  });

  describe('gET /disconnect', () => {
    it('should disconnect from the server', () => request(app)
      .get('/disconnect')
      .then((response) => {
        expect(response.statusCode).to.be.equal(204);
      }));
  });
});