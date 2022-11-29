'use strict';

var utils = require('../utils/writer.js');
var Filmsprivate = require('../service/FilmsprivateService');

module.exports.getPrivateFilms = function getPrivateFilms (req, res, next, pageNo) {
  Filmsprivate.getPrivateFilms(pageNo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
