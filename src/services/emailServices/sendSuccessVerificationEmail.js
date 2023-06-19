const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

const { sendEmail } = require('./sendEmail');

sgMail.setApiKey(SENDGRID_API_KEY);

const sendSuccessVerificationEmail = async to => {
  const subject = 'Success Verification Email';

  const html =
    '<h2>Dear user</h2> <p>Congratulation you are verify your email</p> <p>Thank you.</p> ';

  await sendEmail({
    to,
    subject,
    html,
  });
  return true;
};

module.exports = sendSuccessVerificationEmail;
