import express from 'express';
import { async } from 'regenerator-runtime';
import {getMovieReviews} from '../tmdb-api';
import detailModel from './detailModel'

const router = express.Router();

router.get('/', (req, res, next) => {
  detailModel.find().then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = await detailModel.findByMovieDBId(id);
  if(movie){
    detailModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
  }else{
    res.status(404).send("NOT FOUND");
  }
  
  
});
 
router.get('/:id/reviews', async(req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    const reviews=await getMovieReviews(id)
    res.status(200).send(reviews);
  }
  catch{
    console.log(err)
  }
});



export default router;
