'use strict';

var utils = require('../utils/writer.js');
var Filmspublicassignments = require('../service/FilmspublicassignmentsService');

module.exports.assignReviewBalanced = function assignReviewBalanced (req, res, next) {
  Filmspublicassignments.assignReviewBalanced()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
