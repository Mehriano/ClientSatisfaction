const BigNumber = require('big-number');
const config = require('config');
/* const cryptKey = 1324554401;
const decryptKey = 248007521;
const m = 4288266240; */
function crypt(uuid){
    //let a = (uuid + (Math.floor(Math.random() * 99)*1000));
    //console.log(a);

    let x = BigNumber(uuid)
    .plus((BigNumber(Math.floor(Math.random() * 7777) + 1111).multiply(10000)))
    .multiply(config.get('cryptKey')).mod(config.get('m')) ; 
 console.log(x);
 return x; 
}
function decrypt(y){
    console.log(parseInt(BigNumber(y).multiply(config.get('decryptKey')).mod(config.get('m')).number.reverse().toString().replace(/,/g, '').substr(4,4)));
    let foo = BigNumber(y)
    .multiply(config.get('decryptKey'))
    .mod(config.get('m')).number
    .reverse()
    .toString()
    .replace(/,/g, '')
    .substr(4,4);
}


y = crypt(5678);
x= decrypt(y);
//console.log (BigNumber(5).plus(97).minus(53).plus(434).multiply(5435423).add(321453).multiply(21).div(2).pow(2));

/* const config = require('config');
console.log(config.get('myEmail'));
console.log(config.get('myPassword'));
const {sendEmail} = require('./functions/mailSender');
sendEmail("<p> this is just a test</>",'aymenmehri025@gmail.com','test').catch((err)=> console.log(err)); */