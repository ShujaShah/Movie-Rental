const request = require('supertest');
const { Genre } = require('../../models/entities/genre');

let server;
describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../../index');
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      const genres = [{ name: 'genre1' }, { name: 'genre2' }];

      await Genre.collection.insertMany(genres);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(201);
      expect(res.body.genres.length).toBe(2);
      expect(res.body.genres.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.genres.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });
});
