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
	var renderData={
		sitename:siteInfo[0].sitename,
		username:siteInfo[0].username,
		name:siteInfo[0].name,
		background:siteInfo[0].bpurl,
		subheader:siteInfo[0].subheader,
		pf:siteInfo[0].purl,
		description:siteInfo[0].text};
		console.log(siteInfo[0]);
		res.render('sida',renderData)

	});	


});


module.exports = router;
