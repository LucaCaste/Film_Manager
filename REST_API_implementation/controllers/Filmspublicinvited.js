'use strict';

var utils = require('../utils/writer.js');
var Filmspublicinvited = require('../service/FilmspublicinvitedService');

module.exports.getInvitedFilms = function getInvitedFilms (req, res, next, pageNo) {
  Filmspublicinvited.getInvitedFilms(pageNo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
