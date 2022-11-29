'use strict';

var utils = require('../utils/writer.js');
var Filmspublic = require('../service/FilmspublicService');

module.exports.getPublicFilms = function getPublicFilms (req, res, next, pageNo) {
  Filmspublic.getPublicFilms(pageNo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
