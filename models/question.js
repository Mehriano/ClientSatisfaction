const Joi = require('joi');
const mongoose = require('mongoose');
const {propositionshema , schemaJoiProposition} = require('./proposition');
const {Reponseshema} = require('./reponse')
const questionshema = new mongoose.Schema({
    titreQuestion: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 512
    },
    type: {
        type: String,
        required: true,
        enum: ['Text', 'TextArea', 'Radio','CheckBox']
    },
    ordre: {
        type: Number,
        required: true
    },
    propositions: {
        type: [propositionshema],
        required: this.type =='CheckBox'|| this.type == 'Radio'? true:false

    },
     reponses: {
         type: [Reponseshema]
    }
});
  
const Question = mongoose.model('Question',questionshema);
const schema = Joi.object().keys({
    titreQuestion: Joi.string().min(3).max(512).required(),
    type: Joi.string().valid('Text','TextArea','Radio','CheckBox').required(),
    ordre: Joi.number().required(),
    proposition:Joi.array().items(schemaJoiProposition.required(),schemaJoiProposition.required())
    
 });
function validateQuestion (question) {
 const schema = {
    titreQuestion: Joi.string().min(3).max(512).required(),
    type: Joi.string().valid('Text','TextArea','Radio','CheckBox').required(),
    ordre: Joi.number().required(),
    proposition:Joi.array().items(schemaJoiProposition.required(),schemaJoiProposition.required())
    
 };

 return Joi.validate(question, schema);
}

exports.schemaJoiQuestion = schema;
exports.Question = Question; 
exports.questionshema = questionshema;
exports.validate = validateQuestion;