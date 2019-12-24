const BigNumber = require('big-number');
const config = require('config');
const {
    Boutique
} = require('../models/boutique');


async function numFactureToBoutique(numFacture) {
    let a = '' + numFacture
    console.log(numFacture);
    let uuIdstr = BigNumber(numFacture)
        .multiply(config.get('decryptKey'))
        .mod(config.get('m')).number
        .reverse()
        .toString()
        .replace(/,/g, '')
        .substr(4, 4);
    console.log(uuIdstr);
    uuIdstr = Number(uuIdstr);
    let boutique = await Boutique.findOne({
        uuid: uuIdstr
    });
    return boutique;
}

function generateFacture(uuid) {
    let x = BigNumber(uuid)
        .plus((BigNumber(Math.floor(Math.random() * 7777) + 1111).multiply(10000)))
        .multiply(config.get('cryptKey')).mod(config.get('m')).number
        .reverse().toString().replace(/,/g, '');
    return x;
}
exports.numFactureToBoutique = numFactureToBoutique;
exports.generateFacture = generateFacture;