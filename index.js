var nodemailer = require('nodemailer');

exports = module.exports = {};

var transporter;
var smtpConfig;
var mailOptions;

/******************************************************
 * 
 *          PRIVATE FUNCTIONS
 * 
 ******************************************************/

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
function _setupSmtpTransporter(_smtpConfig) {
    smtpConfig = _smtpConfig;
    transporter = nodemailer.createTransport(smtpConfig);
}

// example mail options
// var mailOptions = {
//     fromName: error log name 
//     fromEmail: user@yourdomain.com
//     to: String or array 
// };
function _setMailOptions(options) {

    if (!options.fromEmail) throw new Error('no from e-mail specified');
    if (!options.toEmail) throw new Error('no toEmail specified');

    var fromName = options.fromName || "Node Error Mailer";
    var to = [].concat(options.toEmail);
    console.log(to);

    mailOptions = {
        from: fromName + ' <' + options.fromEmail + '>',
        to: to.join(","),
        subject: 'Error Notification for ' + options.appName
    };

}

/******************************************************
 * 
 *          PUBLIC FUNCTIONS
 * 
 ******************************************************/

function send(errorMessage, callback) {

    if (!mailOptions) callback('no mailOptions set');
    if (!transporter) callabck('no transporter set');

    callback = callback || function () { };
    console.log('sending error', mailOptions);

    var options = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: errorMessage,
        html: errorMessage
    }
    // send mail with defined transport object
    // transporter.sendMail(options, function (err, info) {

    //     if (err) return callback(err);
    //     return callback(err, info);

    // });


}

function init(options) {
    _setupSmtpTransporter(options.smpt);
    _setMailOptions(options);
}

exports.send = send;
exports.init = init;