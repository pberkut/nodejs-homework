const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, BASE_URL } = process.env;

const { sendEmail } = require('./sendEmail');

sgMail.setApiKey(SENDGRID_API_KEY);

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

module.exports = sendVerificationEmail;
