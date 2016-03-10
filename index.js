var nodemailer = require('nodemailer');

exports = module.exports = {};

var transporter;
var mailOptions;

/******************************************************
 * 
 *          PRIVATE FUNCTIONS
 * 
 ******************************************************/

function _setupSmtpTransporter(smtpConfig) {
    transporter = nodemailer.createTransport(smtpConfig);
}

function _setMailOptions(options) {

    if (!options.fromEmail) throw new Error('no from e-mail specified');
    if (!options.toEmail) throw new Error('no toEmail specified');

    var fromName = options.fromName || "Node Error Mailer";
    var to = [].concat(options.toEmail);
    
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

/**
 * Sends message to the initiated e-mailaddress
 * 
 * @param {string} errorMessage The message that will be send
 * @param {function} callback Optional callback 
 */

function send(errorMessage, callback) {

    if (!mailOptions) callback('no mailOptions set');
    if (!transporter) callback('no transporter set');

    callback = callback || function () { };
  
    var options = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: errorMessage,
        html: errorMessage
    }
    
    transporter.sendMail(options, function (err, info) {

        if (err) return callback(err);
        return callback(err, info);

    });

}

/**
 * Initiates the modudule
 * 
 * @param {object} options 
 */
function init(options) {
    _setupSmtpTransporter(options.smpt);
    _setMailOptions(options);
}

exports.send = send;
exports.init = init;