const Joi = require('joi');
const mongoose = require('mongoose');
 
const propositionshema = new mongoose.Schema({
    titreProposition: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 512
      },
      alert: {
        type: Boolean,
        required: true,
        
    },
    
});
  
const Proposition = mongoose.model('Proposition',propositionshema);
const schema = Joi.object().keys({
  titreProposition: Joi.string().min(5).max(512).required(),
  alert: Joi.boolean().required()
});
function validateProposition (proposition) {
 const schema = Joi.object().keys({
    titreProposition: Joi.string().min(5).max(512).required(),
    alert: Joi.boolean().required()
 });

 return Joi.validate(proposition, schema);
}


exports.Proposition = Proposition; 
exports.schemaJoiProposition = schema;
exports.propositionshema = propositionshema;
exports.validate = validateProposition;