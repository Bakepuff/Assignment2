import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';

const baseUrl = '/api/upcoming';
const movieId = 529203;
const wrongId = 999999;
const deleteId = 551804;

describe('GET', () => {
  it('should get upcoming list', async (done) => {
      await request(app)
        .get(baseUrl)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
      done()
    })
  it('should get specfied movie when the id is valid ', async (done) => {
    await request(app)
      .get(`${baseUrl}/${movieId}`)
      .set("Accept", "application/json")
      .expect(200)
    done()
  })
})

describe('PUT', () => {
  it('should catch error with unexisited movie id', async (done) => {
    await request(app)
      .put(`${baseUrl}/${wrongId}`)
      .send({movieId})
      .expect(404)
    done()
  })
})

describe("Delete",()=>{
  it("should return 200 and delete successfully",()=>{
          return request(app)
            .delete(`${baseUrl}/${deleteId}`)
            .set("Accept", "application/json")
            .expect(200)
            .expect('delete successfully');
        });
  it("should not return not found and delete failed",()=>{
          return request(app)
            .delete(`${baseUrl}/${wrongId}`)
            .set("Accept", "application/json")
            .expect(404)
            .expect('NOT FOUND');
        });
  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
  });
});


