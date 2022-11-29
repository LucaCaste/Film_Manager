'use strict';

var utils = require('../utils/writer.js');
var Films = require('../service/FilmsService');

module.exports.createFilm = function createFilm (req, res, next, body) {
  Films.createFilm(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
