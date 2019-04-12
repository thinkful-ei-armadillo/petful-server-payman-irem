'use strict';

const express = require('express');
const catsRouter = express.Router();

catsRouter
  .route('/get')
  .get((req,res,next) => {
    CatsService.getAllCats(req.app.get('db'))
      .then(cats => {
        res.json(cats);
      })
      .catch(next);
  });

catsRouter
  .route('/:id')
  .get((req,res)=>{
    const db = req.app.get('db');
    let id = req.params.id;
    CatsService.getCatDetails(db, id)
      .then(cat => 
        res.json(cat));
  })
  .delete((req,res) =>{
    const db = req.app.get('db');
    CatsService.deleteCat(db, req.params.id)
      .then(() => res.json(204).end());
  }); 

  module.exports = catsRouter;