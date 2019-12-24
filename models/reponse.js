const Joi = require('joi');
const mongoose = require('mongoose');
const {
    propositionshema
} = require('./proposition');
const {
    numFactureToBoutique
} = require('../functions/numFactureToBoutique');
const {
    sendEmail
} = require('../functions/mailSender');
const {
    Boutique
} = require('../models/boutique');
const {
    User
} = require('../models/user');
const reponseshema = new mongoose.Schema({

    numFacture: { //num boutique 
        type: String
    },
    contenuReponse: {
        type: String,
        minlength: 5,
        maxlength: 515
    },
    propositionId: {
        type: propositionshema
    },
    propositions: {
        type: [propositionshema]
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },

});
reponseshema.post('save', async function (next) {
    let numBoutique = '';
    //init html  to send email 
    let htmlOutput = '';
    let boutique = {};
    let mailresp = '';
    let num;
    if (this.proposition != null && this.proposition != undefined)

        if (this.proposition.alert) {
          /*  numBoutique = await numFactureToBoutique(Number(this.numFacture));
            boutique = await Boutique.findOne({
                uuid: 5555
            });*/
            mailresp = 'aymenmehri025@gmail.com'; //await User.findById(boutique.responsable).email;
            htmlOutput = ` <h1>Notification de la question x</h1>
       <p> un client du boutique ${boutique.nom} a choisit ${this.titreProposition}</p> `;
            sendEmail(htmlOutput, mailresp, 'Client reponse notification');
            return;
        }
    if (this.propositions != undefined) {
        repsWithAlert = this.propositions.filter((prop) => {
            return prop.alert;
        });
        if (repsWithAlert.length > 0) {
           /* numBoutique = numFactureToBoutique(Number(this.numFacture));
            boutique = await Boutique.findOne({
                uuid: numBoutique
            });*/
            mailresp = 'aymenmehri025@gmail.com'; //await User.findById(boutique.responsable).email;
            repsWithAlert.forEach(rep => {

                htmlOutput = ` <h1>Notification de la question x</h1>
               <p> un client du boutique ${boutique.nom} a choisit ${rep.titreProposition}</p> `;
                sendEmail(htmlOutput, mailresp, 'Client reponse notification');
            });
            return
        }
    }

});
const Reponse = mongoose.model('Reponse', reponseshema);


function validateReponse(reponse) {
    const schema = Joi.object().keys({
        numFacture: Joi.string(),
        contenuReponse: Joi.string(),
        propositionId: Joi.objectId(),
        questionId: Joi.objectId().required(),
        propositions: Joi.array().items(Joi.objectId())
    }).xor('contenuReponse', 'propositionId', 'propositions');

    return Joi.validate(reponse, schema);
}

function findBoutiqueId(reponse) {
    const boutiqueUuid = 12345; //this needs to be modified el gamel maybe or affine cypher if possible;
    return Boutique.findOne({
        uuid: boutiqueUuid
    }) || null;
}
exports.Reponseshema = reponseshema;
//exports.ReponseJoiShema = schema; 
exports.findBoutiqueId = findBoutiqueId;
exports.Reponse = Reponse;
exports.validate = validateReponse;