
const express = require('express');
const ville = require('../routes/ville');
const zone = require('../routes/zone');
//const users = require('../routes/users');
//const auth = require('../routes/auth');
//const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  //app.use('/api/user', user);
  //app.use('/api/auth', auth);
  app.use('/api/ville', ville );
  app.use('/api/zone', zone );
  //app.use(error);
}