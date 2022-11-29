'use strict';


/**
 * Get info about users
 *
 * returns List
 **/
exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "password" : "password",
  "name" : "name",
  "id" : 0,
  "email" : ""
}, {
  "password" : "password",
  "name" : "name",
  "id" : 0,
  "email" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

