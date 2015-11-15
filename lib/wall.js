'use strict';

var pg = require('pg');

var DATABASE = 'postgres://postgres:Lovisa95@localhost/sunnsteinn';

function createWritingOnTheWall(username, sitename, text, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, sitename, text, new Date()];
    var query = 'INSERT into wall (username, sitename, text, date) VALUES($1, $2, $3, $4)';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        console.error(err);
        return cb(err);
      } else {
        return cb(null, true);
      }
    });
  });
}


module.exports.listWriting = function listWriting (sitename, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values = [sitename];
    console.log('þetta er valueið: ' +values);
    var query = 'SELECT * FROM wall WHERE sitename = $1';
    client.query(query, values, function (err, result) {
      console.log(result);
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};
module.exports.createEntry = function createEntry (username, sitename, entrytext, cb) {
  createWritingOnTheWall(username, sitename, entrytext,cb);
}


