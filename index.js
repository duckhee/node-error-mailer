var nodemailer = require('nodemailer');

exports = module.exports = {};

var transporter;
var options;
var lastSendTime;
var errorMessages;
var throttler;
var sendCallback;

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


}

function _throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
            return true;
        }
    };
}

function _sendMail() {

    var fromName = options.fromName || "Node Error Mailer";
    var to = [].concat(options.toEmail);

    var subject = (errorMessages.length == 1) ? 'Error Notification for ' + options.appName : 'Error Notifications (' + errorMessages.length + ') for ' + options.appName
    if (errorMessages.length > 1) {

    }
    var mailOptions = {
        from: fromName + ' <' + options.fromEmail + '>',
        to: to.join(", "),
        subject: subject,
        text: errorMessages.join(","),
        html: errorMessages.join(",")
    }

    transporter.sendMail(mailOptions, function (err, info) {

        if (err) return sendCallback(err);
        return sendCallback(err, info);

    });
    
    errorMessages = [];

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
    
	//set public callback 
    sendCallback = callback || function () { };

    if (!options) callback('no options set');
    if (!transporter) callback('no transporter set');

    if (errorMessages.length == 0) lastSendTime = new Date();
    errorMessages.push(errorMessage);
    
    if(!options.throttleTime){
        _sendMail(callback);
    }else{
        //if it's throttled, callback without error  
        if(!throttler()){
            return callback(null, 'throttling');    
        }
    }
}

/**
 * Initiates the modudule
 * 
 * @param {object} options 
 */
function init(_options) {
    options = _options;
    _setupSmtpTransporter(options.smpt);

    errorMessages = [];
    lastSendTime = 0;
    
    if(options.throttleTime){
        throttler = _throttle(_sendMail, options.throttleTime);
    }
}

exports.send = send;
exports.init = init;