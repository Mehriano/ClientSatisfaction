const Joi = require('joi');
const mongoose = require('mongoose');
const {zoneschema} = require('./zone');
 
const boutiqueschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    zone: {
          type:  zoneschema,
          required: true
    }, 
    lieu: { 
        type: String
    }, 
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    

});
  
const Boutique = mongoose.model('Boutique',boutiqueschema);

function validateBoutique (boutique) {
 const schema = {
    nom: Joi.string().min(5).max(50).required(),
    zone: Joi.objectId().required(),
    lieu: Joi. string(),
    responsbaleId: Joi.objectId()
 };

 return Joi.validate(boutique, schema);
}

exports.boutiqueschema = boutiqueschema;
exports.Boutique = Boutique; 
exports.validate = validateBoutique;