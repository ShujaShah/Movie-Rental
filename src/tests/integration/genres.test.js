const request = require('supertest');
const { Genre } = require('../../models/entities/genre');
const { User } = require('../../models/entities/user');

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
  describe('POST /', () => {
    it('should return 401 if the client is not logged in ', async () => {
      const res = await request(server).post('/api/genres').send({
        name: 'genre1',
      });
      expect(res.status).toBe(401);
    });
    it('should return 400 if genre is invalid or less than 3 characters', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'ge' });
      expect(res.status).toBe(400);
    });
    it('should return 400 if genre is more than 20 characters', async () => {
      const name = new Array(22).join('a');
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: name });
      expect(res.status).toBe(400);
    });
    it('should save the genre if it is valid', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre1' });

      const genre = await Genre.find({ name: 'genre1' });
      expect(genre).not.toBeNull();
    });
    it('should return genre if it is valid', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre1' });
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
