import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import actorModel from '../api/actors/actorModel';
import topratedModel from '../api/toprated/topratedModel';
import upcomingModel from '../api/upcoming/upcomingModel';
import detailModel from '../api/movie/detailModel';
import {actors} from './actors.js';
import {getUpcomingMovies,getMovies, getMovie,getTopratedMovies} from '../api/tmdb-api'


const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
      try {
        await userModel.deleteMany();
        await users.forEach(user => userModel.create(user));
        console.info(`${users.length} users were successfully stored.`);
      } catch (err) {
        
      }
    }
    // deletes all movies documents in collection and inserts test data
    
  

  export async function loadActors() {
    console.log('load seed actor data');
    console.log(actors.length);
    try {
      await actorModel.deleteMany();
      await actorModel.collection.insertMany(actors);
      console.info(`${actors.length} actors were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load actor Data: ${err}`);
    }
  }


  export async function loadUpcoming() {
    console.log('load upcomingmovies');
    try {
        getUpcomingMovies().then(async mov => {
        await upcomingModel.deleteMany();
        await detailModel.deleteMany();
        await upcomingModel.collection.insertMany(mov);
        console.info(`${mov.length} Upcomingmovies were successfully stored.`);
        mov.map(async (movie)=>{
          await getMovie(movie.id).then(async (mov)=>{
            await detailModel.collection.insertOne(mov,(err)=>{if(err) console.log(err);
            })
           }
          )
        })
      })
    } catch (err) {
      console.error(`failed to Load upcomingmovie Data: ${err}`);
    }
  }

  export async function loadMovies() {
    console.log('load seed data');
    try {
        getMovies().then(async mov => {
        await movieModel.deleteMany();
        await detailModel.deleteMany();
        await movieModel.collection.insertMany(mov);
        console.info(`${mov.length} Movies were successfully stored.`);
        mov.map(async (movie)=>{
          await getMovie(movie.id).then(async (mov)=>{
            await detailModel.collection.insertOne(mov,(err)=>{if(err) console.log(err);
            })
           }
          )
        })
      })
    } catch (err) {
      console.error(`failed to Load Movie Data: ${err}`);
    }
  }

  export async function loadToprated() {
    console.log('load Topratedmovies');
    try {
        getTopratedMovies().then(async mov => {
        await topratedModel.deleteMany();
        await detailModel.deleteMany();
        await topratedModel.collection.insertMany(mov);
        console.info(`${mov.length} Topratedmovies were successfully stored.`);
        mov.map(async (movie)=>{
          await getMovie(movie.id).then(async (mov)=>{
            await detailModel.collection.insertOne(mov,(err)=>{if(err) console.log(err);
            })
           }
          )
        })
      })
    } catch (err) {
      console.error(`failed to Load topratedmovie Data: ${err}`);
    }
  }

