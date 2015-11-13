'use strict';

var express = require('express');
var router = express.Router();
var sites = require('../lib/sites');

/* GET home page. */
router.get('/', function(req, res) {
  sites.gef('suh3', function (err, entryList) {
  	console.log(entryList);
    res.render('find', {
      entries: entryList
    });
  });
});

router.post('/', function(req, res) {
	console.log(req + ' gunnsteinn segir hæ');
});


module.exports = router;
