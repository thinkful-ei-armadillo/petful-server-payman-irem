'use strict';

const express = require('express');
const usersRouter = express.Router();
const CatsService = require('./cats-service');
const { Queue, peek, display, isEmpty } = require('../modules/queue');
const userQ = new Queue();
let usersA = [];
let counter = 0;

usersRouter
  .route('/')
  .get((req, res, next) => {
    userQ.enqueue('user' + counter);
    res.json({message: 'You are queued to adopt'});
    // if (isEmpty(userQ)) {
    //   CatsService.getAllCats(req.app.get('db'))
    //     .then(cats => {
    //       for (let i = 0; i < cats.length; i++) {
    //         cats[i].adopted = false;
    //         userQ.enqueue(cats[i]);
    //       }
    //       usersA = cats;
    //       res.json(usersA);
    //     })
    //     .catch(next);
    // } else {
    //   res.json(usersA);
    // }
  })
  .delete((req, res, next) => {
    const adopted = userQ.dequeue();
    adopted.adopted = true;
    res.json(204).end();
  });

// usersRouter.route('/queue').get((req, res, next) => {
//   debugger;
//   res.json(peek(userQ));
// });

module.exports = usersRouter;
