import request from 'supertest'
import mongoose from 'mongoose'
import app from '../index'

const baseUrl = '/api/movies'

const user = {
  'username': 'user1',
  'password': 'test1'
}

const movie =  {
  "adult": false,
  "backdrop_path": "/jeAQdDX9nguP6YOX6QSWKDPkbBo.jpg",
  "genre_ids": [
      28,
      14,
      878
  ],
  "id": 590706,
  "original_language": "en",
  "original_title": "Jiu Jitsu",
  "overview": "Every six years, an ancient order of jiu-jitsu fighters joins forces to battle a vicious race of alien invaders. But when a celebrated war hero goes down in defeat, the fate of the planet and mankind hangs in the balance.",
  "popularity": 2633.943,
  "poster_path": "/eLT8Cu357VOwBVTitkmlDEg32Fs.jpg",
  "release_date": "2020-11-20",
  "title": "Jiu Jitsu",
  "video": false,
  "vote_average": 5.9,
  "vote_count": 111
}

let token


describe('Movie api get request testing', () => {
  beforeAll(async () => {
    await request(app)
      .post('/api/users?action=auth')
      .send(user)
      .then((res) => {
        token = 'eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M'
      })
  })

  it('should not get movie list without login', async (done) => {
    await request(app)
      .get(baseUrl)
      .set('authorization', 'fail')
      .expect(401)
    done()
  })
  // it('should get movie list', async (done) => {
  //   await request(app)
  //     .get(baseUrl)
  //     .set('authorization', token)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.length).toBeGreaterThan(0)
  //     })
  //   done()
  // })
  // it('should get specfied movie', async (done) => {
  //   await request(app)
  //     .get(`${baseUrl}/${movie.id}`)
  //     .set('authorization', token)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.id).toBe(movie.id)
  //       expect(res.body.backdrop_path).toBe(movie.backdrop_path)
  //     })
  //   done()
  // })
  afterAll(async () => {
    await mongoose.disconnect()
    await app.close()
  })
})

