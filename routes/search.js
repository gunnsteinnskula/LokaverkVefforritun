'use strict';

var express = require('express');
var router = express.Router();
var friends = require('../lib/friends');

router.get('/', function(req, res) {
	res.render('search', { title:'Express'});
});
 

module.exports = router;