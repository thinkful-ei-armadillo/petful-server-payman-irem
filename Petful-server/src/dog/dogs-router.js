'use strict';

const express = require('express');
const dogsRouter = express.Router();
const DogsService = require('./dogs-service');
const { Queue, peek, display, isEmpty } = require('../modules/queue');

dogsRouter
  .route('/')
  .get((req, res, next) => {
    DogsService.getAllDogs(req.app.get('db'))
      .then(dogs => {
        const dogQ = new Queue();
        for (let i = 0; i < dogs.length; i++) {
          dogQ.enqueue(dogs[i]);
        }
        res.json({ first: peek(dogQ), dogs: display(dogQ) });
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    DogsService.getAllDogs(req.app.get('db'))
      .then(dogs => {
        const dogQ = new Queue();
        for (let i = 0; i < dogs.length; i++) {
          dogQ.enqueue(dogs[i]);
        }
        const dog = dogQ.dequeue();
        res.json(204).end();
      })
      .catch(next);
  });

module.exports = dogsRouter;
