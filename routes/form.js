'use strict';

var express = require('express');
var router = express.Router();
var validate=require('../lib/validate');
var site = require('../lib/sites');
var user = require('../lib/users');
/* GET /form */
router.get('/', function(req, res) {
	var renderData={};
  res.render('form', { renderData:renderData,
  	errors:[] });
	var user=req.session.user;
	console.log(user);
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
	if(renderData.background === ''){
		renderData.background = 'http://i.imgur.com/ZXDrw5D.gif'
	}
	putIn(renderData,req.body, req.session);
	site.createSite(renderData.username, renderData.name, renderData.background, renderData.subheader, renderData.pf, renderData.description, renderData.sitename, function (err, status) {
    if (err) {
    	console.log(err);
      	console.error(err);
      	var villa='Þetta síðunafn hefur verið notað áður, vinsamlegast finndu annað nafn á síðuna'
      	res.render('form', {
      		renderData:renderData, 
      		vm:villa});
    }

    var success = true;

    if (err || !status) {
      success = false;
    }
    if(success){
    	res.render('sida', {renderData:renderData} );


    }
    
  });
});


function putIn(renderData, data, s){
	renderData.sitename=data.sitename,
	renderData.username=s.user.username,
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
