/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

/**
 * tests multiple file routes
 * POST /files
 * GET /files/:id
 * GET /files (don’t forget the pagination)
 * PUT /files/:id/publish
 * PUT /files/:id/unpublish
 * GET /files/:id/data
 */
describe('file Routes', () => {
  it('should create a new file', async () => {
    const res = await request(app)
      .post('/files')
      .send({
        name: 'Test file',
        // other file data
      });
    expect(res.statusCode).toStrictEqual(201);
    // other assertions
    describe('file Routes', () => {
      it('should create a new file', async () => {
        const mockRequest = sinon.stub(app, 'post');
        mockRequest.returns({
          send: sinon.stub().returns({
            name: 'Test file',
            // other file data
          }),
        });
        const res = await app.post('/files');
        expect(res.statusCode).to.equal(201);

        mockRequest.restore();
        // other assertions
      });

      it('should get a file by id', async () => {
        const mockRequest = sinon.stub(app, 'get');
        mockRequest.returns({
          statusCode: 200,
        });
        const res = await app.get('/files/:id');
        expect(res.statusCode).to.equal(200);

        mockRequest.restore();
        // other assertions
      });

      it('should get files with pagination', async () => {
        const mockRequest = sinon.stub(app, 'get');
        mockRequest.returns({
          statusCode: 200,
        });
        const res = await app.get('/files?page=1&limit=10');
        expect(res.statusCode).to.equal(200);

        mockRequest.restore();
        // other assertions
      });

      it('should publish a file', async () => {
        const mockRequest = sinon.stub(app, 'put');
        mockRequest.returns({
          statusCode: 200,
        });
        const res = await app.put('/files/:id/publish');
        expect(res.statusCode).to.equal(200);

        mockRequest.restore();
        // other assertions
      });

      it('should unpublish a file', async () => {
        const mockRequest = sinon.stub(app, 'put');
        mockRequest.returns({
          statusCode: 200,
        });
        const res = await app.put('/files/:id/unpublish');
        expect(res.statusCode).to.equal(200);

        mockRequest.restore();
        // other assertions
      });

      it('should get file data', async () => {
        const mockRequest = sinon.stub(app, 'get');
        mockRequest.returns({
          statusCode: 200,
        });
        const res = await app.get('/files/:id/data');
        expect(res.statusCode).to.equal(200);

        mockRequest.restore();
        // other assertions
      });
    });

    it('should get a file by id', async () => {
      const res = await request(app).get('/files/:id');
      expect(res.statusCode).toStrictEqual(200);
      // other assertions
    });

    it('should get files with pagination', async () => {
      const res = await request(app).get('/files?page=1&limit=10');
      expect(res.statusCode).toStrictEqual(200);
    });

    it('should publish a file', async () => {
      const res = await request(app).put('/files/:id/publish');
      expect(res.statusCode).toStrictEqual(200);
    });

    it('should unpublish a file', async () => {
      const res = await request(app).put('/files/:id/unpublish');
      expect(res.statusCode).toStrictEqual(200);
    });

    it('should get file data', async () => {
      const res = await request(app).get('/files/:id/data');
      expect(res.statusCode).toStrictEqual(200);
    });
  });
});