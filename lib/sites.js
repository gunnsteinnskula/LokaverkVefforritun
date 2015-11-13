'use strict';

var hash = require('../lib/pass').hash;

var pg = require('pg');
var DATABASE = 'postgres://postgres:Lovisa95@localhost/users';

function createNewSite (username, name, bpurl, subheader, purl, text, sitename, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username,  bpurl, subheader, purl, text, name, sitename];
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
}

module.exports.createSite = function createSite (username, name, bpurl, subheader, purl, text, sitename, cb){
    createNewSite(username, name, bpurl, subheader, purl, text, sitename, cb);
  }
