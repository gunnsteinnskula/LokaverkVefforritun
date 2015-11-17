'use strict';

var express = require('express');
var router = express.Router();
var user = require('../lib/users');
/* GET home page. */
router.get('/', loggedInOrNot);


function loggedInOrNot(req, res, next) {
  if (req.session.user) {
  	var user=req.session.user;
    res.render('index', user );
  } else {
    res.render('index', {title: 'Express'});
  }
}

module.exports = router;

