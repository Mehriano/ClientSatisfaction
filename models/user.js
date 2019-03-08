const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
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
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
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
      enum: ['Administrateur', 'ResponsablePersonel', 'ResponsableZone']
  }
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, role: this.role, userName: this.userName }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    nom: Joi.string().min(5).max(50).required(),
    prenom: Joi.string().min(5).max(50).required(),
    ussername: Joi.string().min(5).max(50).required(),
    cin: Joi.number().required(),// To Do Number must be at least 8 characters + concidering changing from int to string
    cin: Joi.number().required(),//  To Do regex  to form a valid phoneNumber 
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;