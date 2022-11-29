'use strict';

var utils = require('../utils/writer.js');
var FilmspublicfilmIdreviews = require('../service/FilmspublicfilmIdreviewsService');

module.exports.getFilmReviews = function getFilmReviews (req, res, next, filmId, pageNo) {
  FilmspublicfilmIdreviews.getFilmReviews(filmId, pageNo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.issueFilmReview = function issueFilmReview (req, res, next, body, filmId) {
  FilmspublicfilmIdreviews.issueFilmReview(body, filmId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
