const Joi = require('joi');
const mongoose = require('mongoose');
const {villeSchema} = require('./ville');
 
const zoneschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      ville: {
          type:  villeSchema,
          required: true
      }
});
  zoneschema.pre('remove', async function(next){
    let boutique = await this.model('Boutique').find({'zone._id': this._id});
    console.log(boutique);
   if (boutique.length>0) return next(new Error('can\'t delete this zone !!! it contains one or more Boutiques'));
   return next();
   } );

const Zone = mongoose.model('Zone',zoneschema);

function validateZone (zone) {
 const schema = {
    nom: Joi.string().min(5).max(50).required(),
    villeId: Joi.objectId().required(),
    responsableId:Joi.objectId()
 };

 return Joi.validate(zone, schema);
}


exports.Zone = Zone; 
exports.zoneschema = zoneschema;
exports.validate = validateZone;