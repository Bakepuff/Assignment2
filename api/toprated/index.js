import express from 'express';
import topratedModel from './topratedModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    topratedModel.find().then(movies => res.status(200).send(movies)).catch(next);
  });

  export default router;
