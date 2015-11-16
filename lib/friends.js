'use strict';

var hash = require('../lib/pass').hash;

var pg = require('pg');
var DATABASE = 'postgres://postgres:Lovisa95@localhost/sunnsteinn';

module.exports.addFriend = function addFriend (me, friend, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values= [me, friend, false];

    var query = 'INSERT into friendship(friend1, friend2, status) VALUES($1, $2, $3)';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
};
module.exports.respondFriend = function  respondFriend(me, friend, responce, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    if(!responce){
      var values=[friend, me];
      var quary='DELETE from friendship where (friend1, friend2)= VALUES($1, $2)'
    }
    if(responce){
      var values=[friend, me, responce];
      var quary = 'UPDATE friendship SET(friend1, friend2, status) VALUES($1, $2, $3)';
    }
    client.query(query, function (err, result) {
      done();
      if (err) {
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
};

module.exports.listFriends = function listFriends (me, status, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    values=[me,status];
    var query = 'select friend1 as friend from friendship where (friend2, status)=($1, $2) union select friend2 as friend from Friendship where (friend1, status)=($1, $2)';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};