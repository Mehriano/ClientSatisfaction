const { Reponse, validate, findBoutiqueId } = require("../models/reponse");
const Question = require('../models/question');
const {Boutique} = require('../models/boutique');
const {Questionnaire} = require('../models/questionnaire');
const express = require("express");
const router = express.Router();

router.post('/',async (req, res)=> {
if (req.body.reponses.length < 2) return res.status(400).send('There is no responses');
let validateObject = {};
  req.body.reponses.forEach(reponse => {
      validateObject = validate(reponse);
    if (validateObject.error) return res.status(400).send(validateObject.error.details[0].message);
  });
  let rep = {};
  let ques = {};
  req.body.reponses.forEach(reponse => {
    rep = new Reponse ({
        numFacture: reponse.numFacture,
        contenuReponse: reponse.contenuReponse,
        propositionId: reponse.propositionId,
        propositions: reponse.propositions
    });
    rep.save();
    ques = Question.findById(reponse.questionId);
    ques.reponses.push(rep);
    ques.update();
  });
  return res.status(200).send('Reponse added Successfully')
});

router.get('/question/:id', async (req, res)=> {
    const reponses = await Question.findById(req.params.id).reponses;
    return res.status(200).send(reponses);
});

router.get('/questionnaire/:id', async (req, res) => {
  const questionnaire = await questionnaire.findById(req.params.id);
  if (!questionnaire) return res.status(404).send('questionnaire not found!');
  let reps = [];
  let ques = {};
  questionnaire.questions.forEach(question => {
    ques = {
      _id: question._id,
      reponses: question.reponses
    };
    reps.push(ques);
  });
  return res.status(200).send({reponses: reps});
});

router.get('/boutique/:id', async (req, res)=> {
  const boutique = await Boutique.findById(req.params.id);
  if (!boutique) return res.status(404).send('boutique not found !');
  let reps = [];
  let repQuestion = {};
  let result = [];
  const questionnaire = await Questionnaire.findById(boutique.questionnaire);
  questionnaire.questions.forEach(question =>{
       reps = Question.findById(question._id).reponses.filter(function (reponse){
         return findBoutiqueId(reponse) == req.params.id;
       });
      repQuestion = {
        questionId: question._id,
        titreQuestion: question.titreQuestion,
        reponses: reps
      };
      result.push(repQuestion);
  });
  return res.status(200).send({reponses: result});
});
module.exports = router; 