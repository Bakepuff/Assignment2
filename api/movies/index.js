import express from 'express';
import {
  getMovies, getMovie, getMovieReviews
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res,next) => {
  getMovies().then(movies => res.status(200).send(movies));
});


export default router;
