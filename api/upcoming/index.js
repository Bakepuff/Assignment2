import express from 'express';
import upcomingModel from './upcomingModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    upcomingModel.find()
    .then(movies => res.status(200).send(movies)).catch(next);
  });

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    upcomingModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
  });

  export default router;
