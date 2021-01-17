import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';

const baseUrl = '/api/upcoming';
const movieId = 529203;
const wrongId = 999999;


describe('GET', () => {
  it('should get specfied movie when the id is valid ', async (done) => {
    await request(app)
      .get(`${baseUrl}/${movieId}`)
      .expect(200)
    done()
  })
})

describe('Movie api put request testing', () => {
  it('should catch error with unexisited movie id', async (done) => {
    await request(app)
      .put(`${baseUrl}/${wrongId}`)
      .send({movieId})
      .expect(404)
    done()
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
  });
});


