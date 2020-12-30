import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/movies'

const user = {
    'username': 'user1',
    'password': 'test1'
}

let token


describe('Movie api get request testing', () => {
    it('should not get movie list', async (done) => {
      await request(app)
        .post(`${baseUrl}`)
        .set('authorization', 'fail')
        .expect(401)
      done()
    })
    afterAll(async () => {
      await mongoose.disconnect()
      await app.close()
    })
  })
  
