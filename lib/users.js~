'use strict';

var hash = require('../lib/pass').hash;

var pg = require('pg');
var DATABASE = 'postgres://postgres:Lovisa95@localhost/users';

function createUserWithHashAndSalt (username, name, salt, hash, purl, address, email, phone, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, name, salt, hash, purl, address, email, phone];
    console.log('Ég fer alveg hingað');
    var query = 'INSERT into users (username, name, salt, hash, purl, adress, email, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8 )';
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

function findUser (username, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username];
    var query = 'SELECT * FROM users WHERE username = $1';
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

module.exports.createUser = function createUser (username, name, password, purl, address, email, phone, cb) {
  hash(password, function (err, salt, hash) {
    if (err) {
      return cb(err);
    }

    createUserWithHashAndSalt(username, name, salt, hash, purl, address, email, phone, cb);
  });
};


module.exports.auth = function auth (username, pass, fn) {
  findUser(username, function (err, result) {
    var user = null;

    if (result.length === 1) {
      user = result[0];
    }

    if (!user) {
      return fn(new Error('cannot find user'));
    }

    hash(pass, user.salt, function(err, hash){
      if (err) {
        return fn(err);
      }
      
      if (hash === user.hash) {
        return fn(null, user);
      }

      fn(new Error('invalid password'));
    });
  });
}
