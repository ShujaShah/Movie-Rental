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
  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1' });
      genre.save();
      const res = await request(server).get('/api/genres/' + genre._id);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', genre.name);
    });
    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
    });
  });
});
