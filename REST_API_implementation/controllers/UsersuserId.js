'use strict';

var utils = require('../utils/writer.js');
var UsersuserId = require('../service/UsersuserIdService');

module.exports.getSingleUser = function getSingleUser (req, res, next, userId) {
  UsersuserId.getSingleUser(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
