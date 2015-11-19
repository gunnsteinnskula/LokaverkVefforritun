'use strict';

var express = require('express');
var router = express.Router();
router.post('/');
var sites = require('../lib/sites');


/* GET home page. */
router.get('/', function(req, res) {
  sites.findSite('example', function(err, siteInfo){
        var renderData={
          sitename:siteInfo[0].sitename,
          username:siteInfo[0].username,
          name:siteInfo[0].name,
          background:siteInfo[0].bpurl,
          subheader:siteInfo[0].subheader,
          pf:siteInfo[0].purl,
          description:siteInfo[0].text
        };
    res.render('sida', {renderData:renderData });
  });
});



module.exports = router;
