const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
 
const propositionshema = new mongoose.Schema({
    titreProposition: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 512
      },
      alert: {
        type: Boolean,
        required: true,
        
      },
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required : true
      }
    
});
  
const Proposition = mongoose.model('Proposition',propositionshema);
const schema = Joi.object().keys({
  titreProposition: Joi.string().min(2).max(512).required(),
  alert: Joi.boolean().required(),
  quesionId: Joi.objectId().required()
});
function validateProposition (proposition) {
 return Joi.validate(proposition, schema);
}


exports.Proposition = Proposition; 
exports.schemaJoiProposition = schema;
exports.propositionshema = propositionshema;
exports.validateProposition = validateProposition;