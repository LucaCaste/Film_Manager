'use strict';

var utils = require('../utils/writer.js');
var Usersauthenticator = require('../service/UsersauthenticatorService');

module.exports.authenticateUser = function authenticateUser (req, res, next, body, type) {
  Usersauthenticator.authenticateUser(body, type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
