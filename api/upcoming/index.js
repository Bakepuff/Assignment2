import express from 'express';
import upcomingModel from './upcomingModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    upcomingModel.find()
    .then(movies => res.status(200).send(movies)).catch(next);
  });

  export default router;
