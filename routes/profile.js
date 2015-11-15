'use strict';

var express = require('express');
var router = express.Router();
var sites = require('../lib/sites');

router.get('/', function(req, res) {
	sites.gef(req.body.val, function (err, siteList) {
		console.log('listinn: ' + siteList);
	    res.render('profile', {
	      sites: siteList,
	      user:req.session.user
	    });
	  });
  	});



router.post('/', function(req, res) {
	res.render('profile', {
		user:req.session.user
	});
});


module.exports=router;

