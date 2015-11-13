'use strict';

var express = require('express');
var router = express.Router();
var validate=require('../lib/validate');
var site = require('../lib/sites');
/* GET /form */
router.get('/', function(req, res) {
  res.render('form', { errors:[] });
});

/* POST /form */
router.post('/', function(req, res) {
	var renderData={
	sitename:'',
	username:'',
	name:'',
	background:'',
	subheader:'',
	pf:'',
	description:''};
	putIn(renderData,req.body);
	if(renderData.background === ''){
		renderData.background = 'http://i.imgur.com/ZXDrw5D.gif'
	}
	site.createSite(renderData.username, renderData.name, renderData.background, renderData.subheader, renderData.purl, renderData.description, renderData.sitename, function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;

    if (err || !status) {
      success = false;
    }

    res.render('create', { title: 'Create site', post: true, success: success })
  });
	res.render('sida', renderData );
});


function putIn(renderData, data){
	renderData.sitename=data.sitename,
	renderData.username=data.username,
	renderData.name=data.name,
	renderData.background=data.background,
	renderData.subheader=data.subheader,
	renderData.pf=data.pf,
	renderData.description=data.description
	return renderData;
}

function villumelding(data){
	var errors=[];
	if(!validate.length(data.name,3))
		errors.push('You must enter your name');
	if(!validate.isEmail(data.email))
		errors.push('The email is not valid');
	if(!validate.address(data.adresse))
		errors.push('The adress is not valid');
	if(!validate.required(data.val))
		errors.push('You must select how you live');
	if(!validate.phonenumber(data.pn))
		errors.push('The phone number is not valid');
	return errors;
}

module.exports = router;
