const request = require('supertest');

let server;
describe('/api/genres', () => {
  // in integration testing we should load the server before and close the server after each test
  beforeEach(() => {
    server = require('../../../index');
  });
  afterEach(() => {
    server.close(); // shut down the server
  });
  describe('GET /', () => {
    it('should return all genres', async () => {
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(201);
    });
  });
});
