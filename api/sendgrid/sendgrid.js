
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const toEmail = function getToEmail(user_id) {
    return db('users')
        .join('dreams', 'dreams.user_id', 'users.id')
        .select('users.email as toEmail')
        .where('users.id', user_id)
}

const fromEmail = function getFromEmail(id) {
    return db('users')
        .select('users.email as fromEmail')
        .where('users.id', id)
}

const fromUsername = function getUsername(id) {
    return db('users')
        .select('users.username')
        .where('users.id', id)
}

const msg = {
    to: toEmail,
    from: 'mymphydreamers@gmail.com',
    subject: 'Another Mympy User Wants to Connect With You',
    text: `From ${username}`<br>`${formtext} - So and so wants to contact you `,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
