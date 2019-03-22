const cryptKey = 1324554401;
const decryptKey = 248007521;
const m = 4288266240;
function crypt(uuid){
    //let a = (uuid + (Math.floor(Math.random() * 99)*1000));
    //console.log(a);
    let x = uuid * cryptKey % m; 
 console.log(x)
 return x;
}
function decrypt(y){
    console.log(y * decryptKey % m);
    return y * decryptKey % m;
}
y = crypt(12589);
x= decrypt(y);