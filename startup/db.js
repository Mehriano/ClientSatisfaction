
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/ClientSatisfaction', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('cant connect to db', err));
}