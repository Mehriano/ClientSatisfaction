const Joi = require('joi');
const mongoose = require('mongoose');
const {propositionshema} = require('./proposition');
 
const reponseshema = new mongoose.Schema({
    /*
    numfacture: { 
        type: String
        This if i decide to include an invoice to answer online 
    }
    */ 
    contenuReponse: {
        type: String,
        minlength: 5,
        maxlength: 515
    },
    proposition:{
        type: propositionshema
    },
    propositions:{
        type:[propositionshema]
    }

});
const Reponse = mongoose.model('Reponse',reponseshema);

function validateReponse (reponse) {
 const schema = Joi.object().keys({
     contenuReponse: Joi.string(),
     propositionId: Joi.objectId(),
     questionId: Joi.objectId().required(),
     propositions: Joi.array().items(Joi.objectId().required())
 }).xor('contenuReponse','propositionId','propositions');

 return Joi.validate(reponse, schema);
}

exports.Reponseshema = reponseshema;
//exports.ReponseJoiShema = schema; 
exports.Reponse = Reponse; 
exports.validate = validateReponse;