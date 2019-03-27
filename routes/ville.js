const {Ville, validate} = require('../models/ville'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
//const

router.get('/', async (req, res) => {
  const ville = await Ville.find().sort('name');
  res.send(ville);
});

router.post('/',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ville = new Ville({ 
    nom: req.body.nom
  });
  try{
  await ville.save();

  res.send(ville);
  }catch(err){
    return res.status(400).send(err.message);
  }
});

router.put('/:id',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ville = await ville.findByIdAndUpdate(req.params.id,
    { 
      nom: req.body.nom,
      
    }, { new: true });

  if (!ville) return res.status(404).send('ville not found.');
  
  res.send(ville);
});

router.delete('/:id',[auth,admin], async (req, res) => {
  const ville = await Ville.findById(req.params.id);

  if (!ville) return res.status(404).send('ville not found.');
  ville.remove();
  res.send(ville);
});

router.get('/:id', async (req, res) => {
  const ville = await Ville.findById(req.params.id);

  if (!ville) return res.status(404).send('ville not found.');

  res.send(ville);
});

module.exports = router; 