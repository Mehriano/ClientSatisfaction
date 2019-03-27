const nodemailer = require ('nodemailer');
const config = require('config');

 async function sendEmail(htmlmessage, to, subject){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get('myEmail'), // generated ethereal user
      pass: config.get('myPassword') // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"ClientSatisfactionNotifier" ${config.get('myEmail')}`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: htmlmessage // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

 }
 exports.sendEmail = sendEmail;