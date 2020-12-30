import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/users'

const movieId = '00'

const user = {
  'username': 'user1',
  'password': 'test1',
}

const newUser = {
  'username': 'user3',
  'password': 'Test333'
}

describe('post requesting testing', () => {
  it('should catch error with unexisited movie id', async (done) => {
    await request(app)
      .post(`${baseUrl}/${user.username}/favourites`)
      .send({id:movieId})
      .expect(500)
    done()
  })
  it('should return 201 when register a new user', async(done) => {
    await request(app)
    .post(`${baseUrl}?action=register`)
    .send(newUser)
    .expect(201)
    .then((res) => {
      expect(res.body.msg).toBe('Successful created new user.')
    })
  done()
  })
})


describe('get request testing', () => {
  it('should get the user list', async (done) => {
    await request(app)
      .get(baseUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(3)
      })
    done()
  })
  it('should get the favourite lists', async (done) => {
    await request(app)
      .get(`${baseUrl}/${user.username}/favourites`)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.length).toBe(0)
      })
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await app.close()
  })
})
