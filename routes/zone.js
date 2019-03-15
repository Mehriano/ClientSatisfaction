const {Ville} = require('../models/ville'); 
const {Zone, validate} = require('../models/zone'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const zones = await Zone.find().sort('name');
  res.send(zones);
});
router.get('/ville/:id', async (req, res) => {
    const zones = await Zone.find({ville: req.body.villeId}).sort('name');
  res.send(zones);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ville = await Ville.findById(req.body.villeId);
  if (!ville) return res.status(400).send('Invalid ville.');

  const zone = new Zone({ 
    nom: req.body.nom,
    ville: { 
        _id: ville._id,
        nom: ville.nom
    }
  });
  await zone.save();
  
  res.send(zone);
});


router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ville = await Ville.findById(req.body.villeId);
  if (!ville) return res.status(400).send('Invalid ville.');

  const zone = await Zone.findByIdAndUpdate(req.params.id,
    { 
      nom: req.body.nom,
      ville: {
          _id: ville._id,
          nom: ville.nom
      }
      
    }, { new: true });

  if (!zone) return res.status(404).send('zone not found.');
  
  res.send(zone);
});

router.delete('/:id', async (req, res) => {
  const zone = await Ville.findByIdAndRemove(req.params.id);

  if (!zone) return res.status(404).send('zone not found.');

  res.send(zone);
});

router.get('/:id', async (req, res) => {
  const zone = await Zone.findById(req.params.id);

  if (!zone) return res.status(404).send('zone not found.');

  res.send(zone);
});

module.exports = router; 