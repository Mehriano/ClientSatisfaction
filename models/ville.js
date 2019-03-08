const Joi = require('joi');
const mongoose = require('mongoose');
 
const villeschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
});
const Ville = mongoose.model('Ville',villeschema);

function validateVille (ville) {
 const schema = {
    nom: Joi.string().min(5).max(50).required()
 };

 return Joi.validate(ville, schema);
}

exports.villeSchema = villeschema;
exports.Ville = Ville; 
exports.validate = validateVille;