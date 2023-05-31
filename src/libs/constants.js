const SUBSCRIPTION_LIST = ['starter', 'pro', 'business'];
const EMAIL_REGEXP = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

module.exports = { SUBSCRIPTION_LIST, EMAIL_REGEXP, PASSWORD_REGEXP };
