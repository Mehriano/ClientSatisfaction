const Joi = require('joi');
const mongoose = require('mongoose');
 
const villeschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
});

villeschema.pre('save', async function (next){
  let ville = await Ville.findById(this._id);
 if (!ville){
   let vi = await Ville.find({nom: this.nom});
 if (vi.length>0) {console.log ('this is being invoqued' + this);
 return next(new Error('nom existe!!'));}
}
 
 console.log ('this is being invoqued' + this);
 next();
}).pre ('remove', async function(next){
 console.log('aymen el mehri ism y name '+ this);
 let a =  await this.model('Zone').find({'ville._id': this._id}).remove();
 return next();

}); 
const Ville = mongoose.model('Ville',villeschema);

function validateVille (ville) {
 const schema = {
    nom: Joi.string().min(5).max(50).required()
 };

 return Joi.validate(ville, schema);
}

exports.villeSchema = villeschema;
exports.Ville = Ville; 
exports.validate = validateVille;