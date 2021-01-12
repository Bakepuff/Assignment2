import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/genres'

describe('Movie api get request testing', () => {
    it('should get genres list', async (done) => {
      await request(app)
        .get(baseUrl)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThan(0)
        })
      done()
    })
    afterAll(async () => {
      await mongoose.disconnect()
      await app.close()
    })
})