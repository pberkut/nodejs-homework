const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: 'boyawa1421@onlcool.com',
//   from: 'sender@mail.com',
//   subject: 'Test email',
//   html: 'TEST email from localhost',
// };

const sendEmail = async mail => {
  const email = { ...mail, from: SENDGRID_SENDER_EMAIL };
  await sgMail.send(email);
  return true;
};

const sendVerificationEmail = async (to, verificationToken) => {
  const subject = 'Email Verification';

  const verificationEmailUrl = `${BASE_URL}/auth/verify/${verificationToken}`;

  const html = `<h2>Dear user</h2>
To verify your email, click on this link: <a href="${verificationEmailUrl}" target="_blank">Click verify email</a> 
If you did not create an account, then ignore this email.`;

  await sendEmail({
    to,
    subject,
    html,
  });
  return true;
};

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

module.exports = { sendVerificationEmail, sendSuccessVerificationEmail };
