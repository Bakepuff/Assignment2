import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/users'
const movieId = 999999

const user1 = {
  'username': 'user1',
  'password': 'test1',
}

const user2 = {
  'username': 'TanShi',
  'password': 'TanShi123456'
}

const user3 = {
  'username': 'TanShi',
  'password': 'TanShi',
}

describe('POST', () => {
  it('should time out 500 with unexisited movie id', async (done) => {
    await request(app)
      .post(`${baseUrl}/${user1.username}/favourites`)
      .send({id:movieId})
      .expect(500)
    done()
  })

  it('should return 201 when register a new user', async(done) => {
    await request(app)
    .post(`${baseUrl}?action=register`)
    .send(user2)
    .expect(201)
    .then((res) => {
      expect(res.body.msg).toBe('Successful created new user.')
    })
  done()
  })

  it('should fail when the password not comply with the rules', async(done) => {
    await request(app)
    .post(`${baseUrl}?action=register`)
    .send(user3)
    .expect(401)
    .then((res) => {
      expect(res.body.msg).toBe('Password needs to comply with the rules.')
    })
  done()
  })

})


describe('GET', () => {

  it('should get the user list', async (done) => {
    await request(app)
      .get(baseUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
      })
    done()
  })

  it('should get the favourite lists', async (done) => {
    await request(app)
      .get(`${baseUrl}/${user1.username}/favourites`)
      .expect('Content-Type', /json/)
      .expect(201)
    done()
  })
  
  afterAll(async () => {
    await mongoose.disconnect()
    await app.close()
  })
})
