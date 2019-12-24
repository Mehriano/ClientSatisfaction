const { Boutique, validate } = require("../models/boutique");
const { Zone } = require("../models/zone");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Questionnaire } = require("../models/questionnaire");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { generateFacture } = require("../functions/numFactureToBoutique");
router.get("/", async (req, res) => {
  const boutiques = await Boutique.find().sort("name");
  res.send(boutiques);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const zone = await Zone.findById(req.body.zoneId);
  if (!zone) return res.status(400).send("Invalid zone.");
  let responsable = await User.findById(req.body.responsableId);
  let questionnaire = await Questionnaire.findById(req.body.questionnaireId);

  const boutique = new Boutique({
    nom: req.body.nom,
    zone: {
      _id: zone._id,
      nom: zone.nom,
      ville: zone.ville
    },
    uuid: req.body.uuid,
    lieu: req.body.lieu,
    responsable: responsable == null ? null : responsable._id,
    questionnaire: questionnaire == null ? null : questionnaire._id
  });
  await boutique.save();

  res.send(boutique);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const zone = await Zone.findById(req.body.zoneId);
  if (!zone) return res.status(400).send("Invalid zone.");
  if (req.body.responsableId) {
    var responsable = await User.findById(req.body.responsableId);
    if (!responsable) return res.status(400).send("Invalid resp.");
  }
  if (req.body.questionnaireId) {
    var questionnaire = await Questionnaire.findById(req.body.questionnaireId);
    if (!questionnaire) return res.status(400).send("Invalid questionnaire.");
  }

  const boutique = await Boutique.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      zone: {
        _id: zone._id,
        nom: zone.nom,
        ville: zone.ville
      },
      lieu: req.body.lieu,
      uuid: req.body.uuid,
      responsable: responsable ? responsable._id : null,
      questionnaire: questionnaire ? questionnaire._id : null
    },
    {
      new: true
    }
  );
  responsable.role = "ResponsablePersonel";
  responsable.zone = zone;
  responsable.save();
  if (!boutique) return res.status(404).send("boutique not found.");

  res.send(boutique);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const boutique = await Boutique.findByIdAndRemove(req.params.id);

  if (!boutique) return res.status(404).send("zone not found.");

  res.send(boutique);
});
router.get("/generatenumfacture/:id", async (req, res) => {
  const boutique = await Boutique.findById(req.params.id);

  if (!boutique) return res.status(404).send("zone not found.");
  const numf = generateFacture(boutique.uuid);
  res.status(200).send(numf);
});
router.get("/:id", async (req, res) => {
  const boutique = await Boutique.findById(req.params.id);

  if (!boutique) return res.status(404).send("boutique not found.");

  res.send(boutique);
});

module.exports = router;
