'use strict';

var express = require('express');
var router = express.Router();
var user = require('../lib/users');
/* GET home page. */
router.get('/', loggedInOrNot);
router.post('/', loginHandler);
router.get('/logout', logoutHandler);


function loggedInOrNot(req, res, next) {
  if (req.session.user) {
  	var user=req.session.user;
    res.render('index', user );
  } else {
    res.render('index', {title: 'Express'});
  }
}

function loginHandler(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  user.auth(username, password, function (err, user) {
    if (user) {
      req.session.regenerate(function (){
        req.session.user = user;
        res.redirect('/');
      });
    } else {
      var data = {
        title: 'Login',
        username: username,
        error: true
      };
      res.render('index', {title: 'Express'});
    }
  });
}


function logoutHandler(req, res, next) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

module.exports = router;

