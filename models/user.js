const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {
  zoneschema
} = require('./zone');
const {
  boutiqueschema
} = require('./boutique');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  prenom: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  cin: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    required: true,
    enum: ['Administrateur', 'ResponsablePersonel', 'ResponsableZone', 'None']
  },
  zone: {
    type: zoneschema,
    required: this.role == 'ResponsableZone' ? true : false
  },
  boutique: {
    type: boutiqueschema,
    required: this.role == 'ResponsablePersonel' ? true : false
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    role: this.role,
    userName: this.userName
  }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    nom: Joi.string().min(5).max(50).required(),
    prenom: Joi.string().min(5).max(50).required(),
    userName: Joi.string().min(5).max(50).required(),
    cin: Joi.string().regex(/^\d+$/).required(), // To Do Number must be at least 8 characters + concidering changing from int to string
    phone: Joi.string().regex(/^[0-9]{8}$/).required(), //  To Do regex  to form a valid phoneNumber 
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().valid('Administrateur', 'ResponsablePersonnel', 'ResponsableZone', 'None').required(),
    zoneId: Joi.when('role', {
      is: 'ResponsableZone',
      then: Joi.objectId().required(),
      otherwise: Joi.optional()
    }),
    boutiqueId: Joi.when('role', {
      is: 'ResponsablePersonel',
      then: Joi.objectId().required(),
      otherwise: Joi.optional()
    })
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.usershema = userSchema;