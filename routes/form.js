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
	name:'',
	subheader:'',
	description:'',
	pf:'',
	background:''};
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
	if(!validate.length(data.sitename,3))
		errors.push('Nafn síðu þarf að innihalda að minnsta kosti 3 stafi.');
	if(!validate.length(data.name,3))
		errors.push('Þetta er ekki löggilt nafn.');
	if(!validate.length(data.subheader,3))
		errors.push('Þetta er ekki löggild undirfyrirsögn.');
	if(!validate.length(data.description,3))
		errors.push('is not valid');
	if(!validate.isPic(data.pf))
		errors.push('Þetta er ekki löggild mynd.');
	return errors;
}

module.exports = router;
