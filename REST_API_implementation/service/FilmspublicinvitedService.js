'use strict';


/**
 * Retrieve the public films that the logged-in user has been invited to review
 * The public films that the logged-in user has been invited to review are retrieved. A pagination mechanism is implemented to limit the size of messages.
 *
 * pageNo Integer The id of the requested page (if absent, the first page is returned) (optional)
 * returns inline_response_200
 **/
exports.getInvitedFilms = function(pageNo) {
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

