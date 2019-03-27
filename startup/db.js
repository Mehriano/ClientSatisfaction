
const mongoose = require('mongoose');

module.exports = function() {
  
  mongoose.connect('mongodb://localhost/ClientSatisfaction', {
   useNewUrlParser: true,
   useFindAndModify:false,
   useCreateIndex: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('cant connect to db', err));
}