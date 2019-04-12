'use strict';

const express = require('express');
const dogsRouter = express.Router();
const DogsService = require('./dogs-service');
const { Queue, peek, display, isEmpty } = require('../modules/queue');
const { app } = require('../server');
const dogQ = new Queue();
let dogA = [];

DogsService.getAllDogs(app.get('db')).then(dogs => {
  for (let i = 0; i < dogs.length; i++) {
    dogs[i].adopted = false;
    dogQ.enqueue(dogs[i]);
  }
  dogA = dogs;
});

dogsRouter
  .route('/')
  .get((req, res, next) => {
    res.json(dogA);
  })
  .delete((req, res, next) => {
    const adopted = dogQ.dequeue();
    adopted.adopted = true;
    res.json(204).end();
  });

dogsRouter.route('/queue').get((req, res, next) => {
  debugger;
  res.json(peek(dogQ));
});

/*dogsRouter.route('/:id').get((req, res) => {
  const db = req.app.get('db');
  let id = req.params.id;
  CatsService.getCatDetails(db, id).then(cat => res.json(cat));
});*/

module.exports = dogsRouter;
