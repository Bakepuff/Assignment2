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

router.put('/:id', async (req, res, next)=>{
  const id = parseInt(req.params.id);
  const upcoming = await upcomingModel.findByMovieDBId(id);
  if(upcoming){
    upcomingModel.findByMovieDBId(id).then(upcoming =>res.status(200).send(upcoming))
  .catch(next);
  }else{
    res.status(404).send({message: `Can't find movie: ${id}.`, status: 404});
  }
});

router.delete('/:id', async (req,res, next)=>{
    const id = parseInt(req.params.id);
    const upcoming = await upcomingModel.findByMovieDBId(id);
    if(upcoming){
     upcomingModel.deleteOne({id: id}).then(res.status(200).send("delete successfully"))
    .catch(next);
    } else{
      res.status(404).send({message: `Can't find movie: ${id}.`, status: 404});
    }
  });
  

  export default router;
