import express from 'express';
import topratedModel from './topratedModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    topratedModel.find().then(movies => res.status(200).send(movies)).catch(next);
  });

  router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    topratedModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
  });
  
  router.put('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const upcoming = await topratedModel.findByMovieDBId(id);
    if(upcoming){
      topratedModel.findByMovieDBId(id).then(upcoming =>res.status(200).send(upcoming))
    .catch(next);
    }else{
      res.status(404).send("NOT FOUND");
    }
  });
  
  router.delete('/:id', async (req,res, next)=>{
      const id = parseInt(req.params.id);
      const upcoming = await topratedModel.findByMovieDBId(id);
      if(upcoming){
       topratedModel.deleteOne({id: id}).then(res.status(200).send("delete successfully"))
      .catch(next);
      } else{
        res.status(404).send("NOT FOUND");
      }
    });
  export default router;


