import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/movie'
const movieID = 464052
const title = "Wonder Woman 1984"
const wrongID = 999999;

const user = {
  'username': 'user1',
  'password': 'test1'
}

describe('GET', () => {
  it('should get movie list', async (done) => {
      await request(app)
        .get(baseUrl)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(40)
        })
      done()
    })
  it('should get specfied movie', async (done) => {
        await request(app)
          .get(`${baseUrl}/${movieID}`)
          .expect(200)
          .then((res) => {
            expect(res.body.id).toBe(464052)
            expect(res.body.original_title).toBe(title)
          })
        done()
      })
  it('should return 404 when the id is invalid', async (done) => {
    await request(app)
      .get(`${baseUrl}/${wrongID}`)
      .set("Accept", "application/json")
      .expect(404)
      .expect('NOT FOUND');
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await app.close()
  })
})

