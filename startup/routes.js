
const express = require('express');
const ville = require('../routes/ville');
const zone = require('../routes/zone');
const questionnaire = require ('../routes/questionanire');
const boutique = require('../routes/boutique');
const user = require('../routes/user');
const auth = require('../routes/auth');
const reponse = require ('../routes/reponse');
//const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/user', user);
  app.use('/api/auth', auth);
  app.use('/api/ville', ville );
  app.use('/api/zone', zone );
  app.use('/api/reponse', reponse);
  app.use('/api/questionnaire', questionnaire);
  app.use('/api/boutique',boutique);
  //app.use(error);
}