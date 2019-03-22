const Joi = require("joi");
const mongoose = require("mongoose");
const { propositionshema, schemaJoiProposition } = require("./proposition");
const { Reponseshema } = require("./reponse");
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
    enum: ["Text", "TextArea", "Radio", "CheckBox"]
  },
  ordre: {
    type: Number
  },
  propositions: {
    type: [propositionshema],
    required: this.type == "CheckBox" || this.type == "Radio" ? true : false
  },
  reponses: {
    type: [Reponseshema]
  }
});

const Question = mongoose.model("Question", questionshema);
const schema = Joi.object().keys({
  _id: Joi.any(),
  titreQuestion: Joi.string()
    .min(3)
    .max(512)
    .required(),
  type: Joi.string()
    .valid("Text", "TextArea", "Radio", "CheckBox")
    .required(),
  ordre: Joi.number(),
  propositions: Joi.array()
    .items(schemaJoiProposition.required(), schemaJoiProposition.required())
    .when("type", { is: ["Radio", "CheckBox"], then: Joi.required() })
    .when("type", { is: ["Text", "TextArea"], then: Joi.forbidden() })
});
function validateQuestion(question) {
  return Joi.validate(question, schema);
}

exports.schemaJoiQuestion = schema;
exports.Question = Question;
exports.questionshema = questionshema;
exports.validateQuestion = validateQuestion;
