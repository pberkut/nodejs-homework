const EMAIL_REGEXP = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

module.exports = { EMAIL_REGEXP, PASSWORD_REGEXP };
