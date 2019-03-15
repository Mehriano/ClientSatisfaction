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
  
const Zone = mongoose.model('Zone',zoneschema);

function validateZone (zone) {
 const schema = {
    nom: Joi.string().min(5).max(50).required(),
    villeId: Joi.objectId().required()
 };

 return Joi.validate(zone, schema);
}


exports.Zone = Zone; 
exports.zoneschema = zoneschema;
exports.validate = validateZone;