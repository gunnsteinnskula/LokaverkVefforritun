'use strict';

var hash = require('../lib/pass').hash;

var pg = require('pg');
var DATABASE = process.env.DATABASE_URL;

module.exports.respondFriend = function respondFriend(me, f, r, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values;
    var query;
    if(!r){
      values=[f, me];
      query='DELETE from friendship where friend1=$1 and friend2=$2';
    }
    if(r){
      values= [f, me, true];
      query = 'UPDATE friendship set (friend1, friend2, status) = ($1, $2, $3) where (friend1, friend2)=($1, $2)';
    }
    client.query(query, values, function (err, result) {
      done();
      if (err) {
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
};


module.exports.addFriend = function addFriend (me, friend, cb) {
  iFriend(me, friend, function (err, result1){
    iFriend(friend, me, function (err, result2){
      if(!result1&&!result2){
        pg.connect(DATABASE, function (error, client, done) {
          if (error) {
      return cb(error);
    }
    var values= [me, friend, false];

    var query = 'INSERT into friendship(friend1, friend2, status) VALUES($1, $2, $3)';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb('Þessi notandi er því miður ekki til');
      } 
      else {
        return cb(null, true);
          }
          });
        });
      }
      else{
        return cb('Þú átt nú þegar vináttu með þessum vini');
      }
    });
  });
};


function iFriend(me, friend, cb){
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return error;
    }
    var values= [me, friend];
    var query = 'SELECT friend1 from friendship where friend1=$1 and friend2=$2';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return false;
      } 
      else {
        if (result.rows.length===1) {
          return cb(null, true);
        }
        return cb(null, false);
      }
    });
  });
}
module.exports.listFriends = function listFriends (me, status, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values=[me,status];
    var query = 'select friend1 as friend from friendship where friend2=$1 and status=$2';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};
module.exports.listFriends2 = function listFriends2 (me, status, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var values=[me,status];
    var query = 'select friend2 as friend from friendship where friend1=$1 and status=$2';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.listUsers = function listUsers (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT username FROM users';
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

function createUserWithHashAndSalt (username, name, salt, hash, purl, address, email, phone, description, gender, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, name, salt, hash, purl, address, email, phone, description, gender];
    var query = 'INSERT into users (username, name, salt, hash, purl, adress, email, phone, description, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
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

module.exports.fu=function fu(username, cb){
  findUser(username, function (err, result) {
    var user = null;

    if (result.length === 1) {
      user = result[0];
    }

    if (!user) {
      return cb(new Error('cannot find user'));
    }
    return cb(null, user);
  });
};

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

module.exports.createUser = function createUser (username, name, password, purl, address, email, phone, description, gender, cb) {
  hash(password, function (err, salt, hash) {
    if (err) {
      return cb(err);
    }

    createUserWithHashAndSalt(username, name, salt, hash, purl, address, email, phone, description, gender, cb);
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
};
