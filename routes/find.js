'use strict';

var express = require('express');
var router = express.Router();
var sites = require('../lib/sites');

/* GET home page. */
router.get('/', function(req, res) {
  sites.gef('suh3', function (err, entryList) {
    res.render('find', {
      entries: entryList
    });
  });
});

router.post('/', function(req, res) {
	sites.findSite(req.body.val, function(err, siteInfo){
		console.log(siteInfo);
		res.render('sida',siteInfo);

	});	


});


module.exports = router;
