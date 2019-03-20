const Joi = require('joi');
const mongoose = require('mongoose');
const {questionshema, schemaJoiQuestion} = require('./question');
 
const questioannaireshema = new mongoose.Schema({
     
    titreQuestioannaire: {
        type: String,
        minlength: 5,
        maxlength: 515
    },
    questions:{
        type:[questionshema]
    }

});
const Questionnaire = mongoose.model('Questionnaire',questioannaireshema);

function validateQuestioannaire (questionnaire) {
 const schema = Joi.object().keys({
     titreQuestioannaire: Joi.string().min(5).max(515),
     questions: Joi.array().items(schemaJoiQuestion.required())
 });

 return Joi.validate(questionnaire, schema);
}

exports.questioannaireshema = questioannaireshema;

exports.Questionnaire = Questionnaire; 
exports.validate = validateQuestioannaire;