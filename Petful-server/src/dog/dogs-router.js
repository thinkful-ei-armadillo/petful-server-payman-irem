'use strict';

const express = require('express');
const dogsRouter = express.Router();

dogsRouter
  .route('/get')
  .get((req,res,next) => {
    DogsService.getAllDogs(req.app.get('db'))
      .then(dogs => {
        res.json(dogs);
      })
      .catch(next);
  });

dogsRouter
  .route('/:id')
  .get((req,res)=>{
    const db = req.app.get('db');
    let id = req.params.id;
    DogsService.getCatDetails(db, id)
      .then(cat => 
        res.json(cat));
  })
  .delete((req,res) =>{
    const db = req.app.get('db');
    DogsService.deleteCat(db, req.params.id)
      .then(() => res.json(204).end());
  }); 

module.exports = dogsRouter;