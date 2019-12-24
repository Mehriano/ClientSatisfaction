const {
  Reponse,
  validate,
  findBoutiqueId
} = require("../models/reponse");
const {
  Question,
  questionshema
} = require("../models/question");
const {
  Boutique
} = require("../models/boutique");
const {
  Questionnaire
} = require("../models/questionnaire");
const {
  Proposition
} = require("../models/proposition");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  if (req.body.reponses.length < 1)
    return res.status(400).send("There is no responses");
  let validateObject = {};
  req.body.reponses.forEach(reponse => {
    validateObject = validate(reponse);
    if (validateObject.error)
      return res.status(400).send(validateObject.error.details[0].message);
  });
  let props = [];
  let prop = {};
  let rep = {};
  let ques = {};
  req.body.reponses.forEach(async reponse => {
    if (reponse.contenuReponse) {
      rep = new Reponse({
        question: reponse.questionId,
        numFacture: reponse.numFacture,
        contenuReponse: reponse.contenuReponse
      });
    } else if (reponse.propositionId) {
      prop = await Proposition.findById(reponse.propositionId);
      if (!prop) return res.status(400).send("invalid proposition");
      rep = new Reponse({
        numFacture: reponse.numFacture,
        propositionId: prop,
        question: reponse.questionId
      });
    } else {
      reponse.propositions.forEach(p => {
        Proposition.findById(p).then(prop => {
          if (!prop) return res.status(400).send("invalid proposition");
          console.log(prop);
          props.push(prop);
          console.log(props);
          rep = new Reponse({
            numFacture: reponse.numFacture,
            propositions: props,
            question: reponse.questionId
          });
        });
      });
    }
    setTimeout(async () => {
      console.log(rep);
      rep = await rep.save();
      console.log(rep);
      ques = await Question.findById(reponse.questionId);
      console.log(ques);
      ques.reponses.push(rep);
      ques = await ques.save();
    }, 3000);
  });
  return res.status(200).send("Reponse added Successfully");
});

router.get("/question/:id", async (req, res) => {
  const ques = await Question.findById(req.params.id);
  if (ques.type == "Text" || ques.type == "TextArea") {
    return res
      .status(400)
      .send("question needs to be Radio or checkbox or dropdown");
  }
  let toSend = statperQuestion(ques);
  return res.status(200).send(toSend);
});

router.get("/questionnaire/:id", async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id);
  if (!questionnaire) return res.status(404).send("questionnaire not found!");
  let reps = [];
  let qq = {};
  let statQ = {};
  let tempquestionnaire = questionnaire.questions.filter(ques => {
    return ques.type == "CheckBox" || ques.type == "Radio";
  });
  console.log(tempquestionnaire);
  if (tempquestionnaire) {
    tempquestionnaire.forEach(async q => {
      qq = await Question.findById(q._id);
      console.log(qq);
      statQ = statperQuestion(qq);
      quesTosend = {
        name: statQ.titreQuestion,
        series: statQ.reponses
      };

      reps.push(quesTosend);
      quesTosend = {};
      //console.log(reps);
    });
    setTimeout(() => {
      return res.status(200).send(reps);
    }, 2000);

  }
  return res.status(501);
});

router.get("/boutique/:id", async (req, res) => {
  const boutique = await Boutique.findById(req.params.id);
  if (!boutique) return res.status(404).send("boutique not found !");
  let reps = [];
  let repQuestion = {};
  let result = [];
  const questionnaire = await Questionnaire.findById(boutique.questionnaire);
  questionnaire.questions.forEach(question => {
    reps = Question.findById(question._id).reponses.filter(function (reponse) {
      return findBoutiqueId(reponse) == req.params.id;
    });
    repQuestion = {
      questionId: question._id,
      titreQuestion: question.titreQuestion,
      reponses: reps
    };
    result.push(repQuestion);
  });
  return res.status(200).send({
    reponses: result
  });
});
router.get("/questions", async (req, res) => {
  let ques = await Question.find({
    $or: [{
        type: "Radio"
      },
      {
        type: "CheckBox"
      }
    ]
  });
  res.status(200).send(ques);
});

function statperQuestion(ques) {
  let reponses = [];
  let prep = {};
  let size = 0;
  if (ques.type == "Radio") {
    ques.propositions.forEach(prop => {
      size = ques.reponses.filter(function (element) {
        return element.propositionId._id.toString() == prop._id.toString();
      }).length;
      prep = {
        name: prop.titreProposition,
        value: size
      };
      reponses.push(prep);
    });
    let toSend = {
      titreQuestion: ques.titreQuestion,
      reponses: reponses
    };
    reponses = [];
    console.log(toSend, 'tosend');
    return toSend;

  } else if (ques.type == 'CheckBox') {
    // size = 0 ;
    reponses = [];
    ques.propositions.forEach(prop2 => {
      size = ques.reponses.filter(rep =>
        rep.propositions.some(p => p._id.toString() === prop2._id.toString())
      ).length;

      prep = {
        name: prop2.titreProposition,
        value: size
      };
      reponses.push(prep);
    });
    let toSend = {
      titreQuestion: ques.titreQuestion,
      reponses: reponses
    };
    console.log(toSend, 'tosend');
    reponses = [];
    return toSend;
  }

}
module.exports = router;