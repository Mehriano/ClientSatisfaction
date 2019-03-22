const Joi = require('joi');
const mongoose = require('mongoose');
const {propositionshema} = require('./proposition');
 
const reponseshema = new mongoose.Schema({
    
    numFacture: {  //num boutique 
        type: String 
    }
    ,
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
     numFacture: Joi.string(),
     contenuReponse: Joi.string(),
     propositionId: Joi.objectId(),
     questionId: Joi.objectId().required(),
     propositions: Joi.array().items(Joi.objectId().required())
 }).xor('contenuReponse','propositionId','propositions');

 return Joi.validate(reponse, schema);
}
function findBoutiqueId(reponse){
 const boutiqueUuid = 12345; //this needs to be modified el gamel maybe or affine cypher if possible;
 return Boutique.findOne({uuid: boutiqueUuid}) || null;
}
exports.Reponseshema = reponseshema;
//exports.ReponseJoiShema = schema; 
exports.findBoutiqueId = findBoutiqueId;
exports.Reponse = Reponse; 
exports.validate = validateReponse;