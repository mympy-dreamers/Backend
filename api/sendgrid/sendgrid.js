
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: '(var)',
    from: 'var',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'var',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

// 