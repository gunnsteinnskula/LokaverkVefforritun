'use strict';

var express = require('express');
var router = express.Router();
var sites = require('../lib/sites');
var entries = require('../lib/wall');

/* GET home page. */
router.get('/', function(req, res) {
  	sites.gef(req.session.user.username, function (err, entryList) {
    res.render('find', {
      entries: entryList
    });
  });
});

router.post('/', function(req, res,next) {
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
				console.log('listi af skrifum:' + entryList);
				var data={
				renderData:renderData,
				entries: entryList};
				res.render('sida', data)
			});

      });
    }
    console.log(req.body.text);
	if(req.body.text){
	 	tagOnTheWallHandler(req,res,next)	
	}
});

function tagOnTheWallHandler(req, res, next){
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
    index(req, res, next);
  });
}

function index(req, res, next) {
  var user = req.session.user;
  entries.listWriting(req.body.sitename, function (err, entryList) {
  	sites.findSite(req.body.sitename, function(err, siteInfo){
  		
				console.log('crash heheeh');
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
