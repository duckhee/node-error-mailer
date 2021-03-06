node-error-mailer
=================

A small, simple module that allows you to send errors to an e-mail address using smtp

## Installation

    npm install node-error-mailer
    
## Usage

    var nodeErrorMailer = require ('node-error-mailer');

    var options = {
        fromEmail: 'from.user@yourdomain.com',
        toEmail: 'from.user@yourdomain.com',
        appName: 'Test App',
        throttleTime: 5000
        smtp: {
            host: 'smtp.yourdomain.nu',
            port: 587,
            auth: {
                user: 'user@yourdomain.nu',
                pass: 'password'
            }
        }
    }

    nodeErrorMailer.init(options);

    nodeErrorMailer.send('an error occured', function(err, data){
        console.log(err, data);
    });

the callback for the send method is optional:

    nodeErrorMailer.send('an error occured');
    
throttleTime allows you to limit the e-mails send within a certain period. 

## Release History

* 0.0.1 Initial Working Version
* 0.0.2 Bug Fixing
* 0.0.3 Code Cleanup & Commenting
* 0.0.4 Adds Throttling
* 0.0.5 Typos