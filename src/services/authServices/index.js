const register = require('./register');
const login = require('./login');
const logout = require('./logout');

module.exports.authServices = { register, login, logout };
