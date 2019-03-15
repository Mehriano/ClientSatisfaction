const {Ville, validate} = require('../models/ville'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const ville = await Ville.find().sort('name');
  res.send(ville);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ville = new Ville({ 
    nom: req.body.nom
  });
  await ville.save();
  
  res.send(ville);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ville = await ville.findByIdAndUpdate(req.params.id,
    { 
      nom: req.body.nom,
      
    }, { new: true });

  if (!ville) return res.status(404).send('ville not found.');
  
  res.send(ville);
});

router.delete('/:id', async (req, res) => {
  const ville = await Ville.findByIdAndRemove(req.params.id);

  if (!ville) return res.status(404).send('ville not found.');

  res.send(ville);
});

router.get('/:id', async (req, res) => {
  const ville = await Ville.findById(req.params.id);

  if (!ville) return res.status(404).send('ville not found.');

  res.send(ville);
});

module.exports = router; 