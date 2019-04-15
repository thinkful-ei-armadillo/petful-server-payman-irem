const { Queue, peek, display, isEmpty } = require('../modules/queue');

const userQ = new Queue();
let counter = 0;

function users(req, res, next) {
  let user = 'user' + counter;
  counter++;
  userQ.enqueue(user);
  req.user = user;
  next();
}

function remove() {
  userQ.dequeue();
}

module.exports = { users, remove, userQ };
