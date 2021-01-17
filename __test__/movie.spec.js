import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/movies'
const wrongID = 999999;

const user = {
  'username': 'user1',
  'password': 'test1'
}

describe('GET', () => {
  
  it('should not get movie list without login', async (done) => {
    await request(app)
      .get(baseUrl)
      .set('authorization', 'fail')
      .expect(401)
    done()
  })

  it('should return 401 when the id is invalid', async (done) => {
    await request(app)
      .get(`${baseUrl}/${wrongID}`)
      .expect(401)
    done()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await app.close()
  })
})

