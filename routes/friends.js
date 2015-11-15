'use strict';

var express = require('express');
var router = express.Router();
var users=require('../lib/users');
var sites = require('../lib/sites');
var entries = require('../lib/wall');
/* GET /form */
router.get('/', function(req, res) {
	users.listUsers(function (err, userList) {
		res.render('friends', {
			friends: userList
		});
	});
});

/* POST /form */
router.post('/', function(req, res) {
	if(req.body.siteval){
		console.log('ferher');
	  	sites.gef(req.body.siteval, function (err, siteList) {
	    res.render('profile', {
	      sites: siteList
	    });
	  });
  	}
  	if(req.body.val){
		  entries.listWriting(req.body.val, function (err, entryList) {
  			sites.findSite(req.body.val, function(err, siteInfo){
				var renderData={
					sitename:siteInfo[0].sitename,
					username:siteInfo[0].username,
					name:siteInfo[0].name,
					background:siteInfo[0].bpurl,
					subheader:siteInfo[0].subheader,
					pf:siteInfo[0].purl,
					description:siteInfo[0].text
				};
				var data={
				renderData:renderData,
				entries: entryList};
				res.render('sida', data)
			});
  		});
	}
	if(req.body.text){
	 	tagOnTheWallHandler(req,res)	
	}
});

function tagOnTheWallHandler(req, res){
	console.log(req.body.text + req.body.sitename);
  	var text = req.body.text;
  	var sitename=req.body.sitename;
  	var user = req.session.user;
  	entries.createEntry(user.username, sitename, text, function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;

    if (err || !status) {
      success = false;
    }
    index(req, res);
  });
}

function index(req, res) {
  var user = req.session.user;
  entries.listWriting(req.body.sitename, function (err, entryList) {
  	sites.findSite(req.body.sitename, function(err, siteInfo){
  		var renderData={
		sitename:siteInfo[0].sitename,
		username:siteInfo[0].username,
		name:siteInfo[0].name,
		background:siteInfo[0].bpurl,
		subheader:siteInfo[0].subheader,
		pf:siteInfo[0].purl,
		description:siteInfo[0].text};
		var data={
			renderData:renderData,
			entries: entryList};
			res.render('sida', data)
		});

      });
    }


module.exports = router;
