'use strict';

var express = require('express');
var router = express.Router();
var users=require('../lib/users');
/* GET home page. */
router.get('/', loggedInOrNot);


function loggedInOrNot(req, res, next) {
  if (req.session.user) {
  	var user=req.session.user;
  	users.listFriends(user.username, false, function(err, results){
  		res.render('index', {
  			user:user,
  			requests:results
  		});
  	});
  }
  else {
    res.render('index', {title: 'Express'});
  }
}

console.log('=========================== ER Í LAYOUT.JS ==================================');
module.exports = router;

