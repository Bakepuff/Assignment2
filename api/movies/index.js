import express from 'express';
import { getMovieReviews,getCreditDetail,getSimilarMovies,getMovieCredits} from '../tmdb-api';
import movieModel from './movieModel'

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});

router.get('/:id/similar', (req, res, next) => {
  const id = parseInt(req.params.id);
  getSimilarMovies(id)
  .then(similarMovies => res.status(200).send(similarMovies))
  .catch((error)=> next(error));
});

router.get('/:id/credit', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieCredits(id)
  .then(similarMovies => res.status(200).send(similarMovies))
  .catch((error)=> next(error));
});

router.get('/:id/creditDetail', (req, res, next) => {
  const id = parseInt(req.params.id);
  getCreditDetail(id)
  .then(similarMovies => res.status(200).send(similarMovies))
  .catch((error)=> next(error));
});





export default router;
