'use strict';

const express = require('express');
const knex = require('knex');
const cors = require('cors');

const { DB_URL, CLIENT_ORIGIN } = require('./config');
const port = process.env.PORT || 80;
const app = express();

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

module.exports = { app };

const catsRouter = require('./cat/cats-router');
const dogsRouter = require('./dog/dogs-router');

app.use('/api/cat', catsRouter);
app.use('/api/dog', dogsRouter);

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

app.listen(port, () => {
  console.log('Serving on 8080');
});
