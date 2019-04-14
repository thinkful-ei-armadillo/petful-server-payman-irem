'use strict';

const express = require('express');
const knex = require('knex');
const cors = require('cors');
const catsRouter = require('./cat/cats-router');
const dogsRouter = require('./dog/dogs-router');
const usersRouter = require('./dog/dogs-router');
const { PORT, DB_URL, CLIENT_ORIGIN } = require('./config');

const app = express();

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db);
app.use(
  cors({
    origin: 'https://payman-irem-petful-app.now.sh/'
  })
);

app.use('/api/cat', catsRouter);
app.use('/api/dog', dogsRouter);
app.use('/api/user', usersRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(8080, () => {
  console.log('Serving on 8080');
});
