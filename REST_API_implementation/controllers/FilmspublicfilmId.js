'use strict';

var utils = require('../utils/writer.js');
var FilmspublicfilmId = require('../service/FilmspublicfilmIdService');

module.exports.deleteSinglePublicFilm = function deleteSinglePublicFilm (req, res, next, filmId) {
  FilmspublicfilmId.deleteSinglePublicFilm(filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSinglePublicFilm = function getSinglePublicFilm (req, res, next, filmId) {
  FilmspublicfilmId.getSinglePublicFilm(filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSinglePublicFilm = function updateSinglePublicFilm (req, res, next, body, filmId) {
  FilmspublicfilmId.updateSinglePublicFilm(body, filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
