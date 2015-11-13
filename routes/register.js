'use strict';

var express = require('express');
var router = express.Router();
var users = require('../lib/users');

/* GET home page. */
router.get('/', function(req, res) {

  res.render('register', {  });
});

router.post('/', function(req,res){
	var username=req.body.username;
	var name= req.body.name;
	var pf=req.body.pf;
	var home=req.body.adresse;
	var email = req.body.email;
	var pn = req.body.pn;
	var pw = req.body.pw;
	users.createUser(username, name, pw, pf, home, email, pn, function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;

    if (err || !status) {
      success = false;
    }

    res.render('create', { title: 'Create user', post: true, success: success })
  });
	res.render('', {} );
});

module.exports = router;
