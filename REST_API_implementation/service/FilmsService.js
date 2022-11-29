'use strict';


/**
 * Insert a new film
 *
 * body Film Rappresentation of the film
 * returns film
 **/
exports.createFilm = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "owner" : 6,
  "private" : true,
  "watchDate" : "2000-01-23",
  "rating" : 2,
  "id" : 0,
  "title" : "title",
  "favorite" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

