const Joi = require('joi');
const mongoose = require('mongoose');
const {villeSchema} = require('./ville');
 
const zoneschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      ville: {
          type:  villeSchema,
          required: true
      }
});
const Zone = mongoose.model('Ville',zoneschema);

function validateVille (ville) {
 const schema = {
    nom: Joi.string().min(5).max(50).required()
 };

 return Joi.validate(ville, schema);
}


exports.Ville = Ville; 
exports.validate = validateVille;