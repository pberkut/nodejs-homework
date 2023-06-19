const sgMail = require('@sendgrid/mail');

const { SENDGRID_SENDER_EMAIL } = process.env;

const sendEmail = async mail => {
  const email = { ...mail, from: SENDGRID_SENDER_EMAIL };
  await sgMail.send(email);
  return true;
};

module.exports = { sendEmail };

// const email = {
//   to: 'boyawa1421@onlcool.com',
//   from: 'sender@mail.com',
//   subject: 'Test email',
//   html: 'TEST email from localhost',
// };
