'use strict';


/**
 * Get a list of the film of a user logged in
 *
 * pageNo Integer  (optional)
 * returns inline_response_200
 **/
exports.getPrivateFilms = function(pageNo) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "next" : "http://example.com/aeiou",
  "films" : [ {
    "owner" : 6,
    "private" : true,
    "watchDate" : "2000-01-23",
    "rating" : 2,
    "id" : 0,
    "title" : "title",
    "favorite" : false
  }, {
    "owner" : 6,
    "private" : true,
    "watchDate" : "2000-01-23",
    "rating" : 2,
    "id" : 0,
    "title" : "title",
    "favorite" : false
  } ],
  "totalItems" : 1,
  "totalPages" : 0,
  "currentPage" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

