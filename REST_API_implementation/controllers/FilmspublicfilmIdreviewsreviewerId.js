'use strict';

var utils = require('../utils/writer.js');
var FilmspublicfilmIdreviewsreviewerId = require('../service/FilmspublicfilmIdreviewsreviewerIdService');

module.exports.deleteSingleReview = function deleteSingleReview (req, res, next, filmId, reviewerId) {
  FilmspublicfilmIdreviewsreviewerId.deleteSingleReview(filmId, reviewerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSingleReview = function getSingleReview (req, res, next, filmId, reviewerId) {
  FilmspublicfilmIdreviewsreviewerId.getSingleReview(filmId, reviewerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSingleReview = function updateSingleReview (req, res, next, body, filmId, reviewerId) {
  FilmspublicfilmIdreviewsreviewerId.updateSingleReview(body, filmId, reviewerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
