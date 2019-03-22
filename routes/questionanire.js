const { Question, validateQuestion } = require("../models/question");
const { Questionnaire, validate } = require("../models/questionnaire");
const { Proposition, validateProposition } = require("../models/proposition");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const questionnaire = await Questionnaire.find();
  res.send(questionnaire);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let questions = [];
  let prop = {};
  let ques = {};
  let props = [];
  req.body.questions.forEach(question => {
    ques = new Question({
      titreQuestion: question.titreQuestion,
      ordre: question.ordre,
      type: question.type
    });
    ques.save();
    if (question.propositions) {
      question.propositions.forEach(proposition => {
        prop = new Proposition({
          titreProposition: proposition.titreProposition,
          alert: proposition.alert,
          question: ques._id
        });
        prop.save();
        props.push(prop);
      });
      ques.propositions = props;
      ques.update();
    }

    questions.push(ques);
  });

  const questionnaire = new Questionnaire({
    titreQuestioannaire: req.body.titreQuestioannaire,
    questions: questions
  });
  await questionnaire.save();

  res.send(questionnaire);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.body.questions.forEach(question => {
    if (question.propositions) {
      question.propositions.forEach(proposition => {
        Proposition.findByIdAndUpdate(
          proposition._id,
          {
            titreProposition: proposition.titreProposition,
            alert: proposition.alert,
            question: proposition.question
          }
        );
        
      });
    }
     Question.findByIdAndUpdate(
      question._id,
      {
        titreQuestion: question.titreQuestion,
        ordre: question.ordre,
        type: question.type,
        propositions: question.propositions
      } );
  });

  const questionnaire = await Questionnaire.findByIdAndUpdate(
    req.params.id,
    {
      titreQuestioannaire: req.body.titreQuestioannaire,
      questions: req.body.questions
    },
    { new: true }
  );

  if (!questionnaire) return res.status(404).send("questionnaire not found.");

  res.send(questionnaire);
});

router.put("/question/:id", [auth, admin], async (req, res) => {
  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      titreQuestion: req.body.titreQuestion,
      ordre: req.body.ordre,
      type: req.body.type
    },
    { new: true }
  );

  if (!question) return res.status(404).send("question not found.");

  res.send(question);
});
router.put("/proposition/:id", [auth, admin], async (req, res) => {
  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      titreQuestion: req.body.titreQuestion,
      ordre: req.body.ordre,
      type: req.body.type
    },
    { new: true }
  );

  if (!question) return res.status(404).send("question not found.");

  res.send(question);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const questionnaire = await Questionnaire.findByIdAndRemove(req.params.id);

  if (!questionnaire) return res.status(404).send("questionnaire not found.");

  res.send(questionnaire);
});

router.get("/:id", async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id);

  if (!questionnaire) return res.status(404).send("questionnaire not found.");

  res.send(questionnaire);
});

module.exports = router;
