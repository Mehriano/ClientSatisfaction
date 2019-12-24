const Joi = require('joi');
const mongoose = require('mongoose');
const {
    zoneschema
} = require('./zone');

const boutiqueschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    zone: {
        type: zoneschema,
        required: true
    },
    lieu: {
        type: String
    },
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questionnaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire'
    },
    uuid: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999
    }


});

const Boutique = mongoose.model('Boutique', boutiqueschema);

function validateBoutique(boutique) {
    const schema = {
        nom: Joi.string().min(5).max(50).required(),
        zoneId: Joi.objectId().required(),
        lieu: Joi.string(),
        responsableId: Joi.objectId(),
        questionnaireId: Joi.objectId(),
        uuid: Joi.number().min(1000).max(9999)
    };

    return Joi.validate(boutique, schema);
}

exports.boutiqueschema = boutiqueschema;
exports.Boutique = Boutique;
exports.validate = validateBoutique;