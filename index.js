var nodemailer = require('nodemailer');

exports = module.exports = {};

var transporter;

/*
    USERSTORIES
    
    - I want to receive max 1 e-mail every 5 minutes 
    -
    
*/



//  uses nodemailer to setup 
//  example object:
//  {
//      host: 'smtp.yourdomain.com',
//      port: 587,
//      auth: {
//          user: 'user@yourdomain.com',
//          pass: 'password'
//      }
//  }
function setupSmtpTransporter(smtpConfig){
    transporter = nodemailer.createTransport(smtpConfig);
}

// example mail options
// var mailOptions = {
//     from: fromName +' ✔ <'+ fromEmail +'>', // sender address
//     to: to.join(), // list of receivers
// };
function setMailOptions(options){
    
}

function send(error){
    
}

function init(smtpConfig, mailOptions){
    
}