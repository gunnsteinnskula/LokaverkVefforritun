'use strict';

var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;

function createNewSite (un, n, bp, sh, p, t, sn, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values = [un,  bp, sh, p, t, n, sn];
    var query = 'INSERT into sites (username,  bpurl, subheader, purl, text, name, sitename) VALUES($1, $2, $3, $4, $5, $6, $7 )';
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

module.exports.findSite=function findSite (sitename, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [sitename];
    var query = 'SELECT * FROM sites WHERE sitename = $1';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(err);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.gef=function gef (username, cb){
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username];
    var query = 'SELECT sitename FROM sites WHERE username = $1';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(err);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.createSite = function createSite (un, n, bp, sh, p, t, s, cb){
    createNewSite(un, n, bp, sh, p, t, s, cb);
  };
