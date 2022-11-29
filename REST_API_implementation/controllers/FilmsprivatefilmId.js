'use strict';

var utils = require('../utils/writer.js');
var FilmsprivatefilmId = require('../service/FilmsprivatefilmIdService');

module.exports.deleteSinglePrivateFilm = function deleteSinglePrivateFilm (req, res, next, filmId) {
  FilmsprivatefilmId.deleteSinglePrivateFilm(filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSinglePrivateFilm = function getSinglePrivateFilm (req, res, next, filmId) {
  FilmsprivatefilmId.getSinglePrivateFilm(filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSinglePrivateFilm = function updateSinglePrivateFilm (req, res, next, body, filmId) {
  FilmsprivatefilmId.updateSinglePrivateFilm(body, filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
