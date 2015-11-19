'use strict';

var express = require('express');
var router = express.Router();
var users = require('../lib/users');

/* GET home page. */
router.get('/', function(req, res) {

  var renderData={};
  res.render('register', { renderData:renderData });
});


router.post('/', function(req,res){
  var renderData={
	username:req.body.username,
	name:req.body.name,
	pf:req.body.pf,
	home:req.body.adresse,
	email:req.body.email,
	pn:req.body.pn,
	pw:req.body.pw};
  if(renderData.pw!=='')
    users.createUser(renderData.username, renderData.name, renderData.pw, renderData.pf, renderData.home, renderData.email, renderData.pn, function (err, status) {
      if (err) {
          console.error(err);
          var vm='Þessi notandi er núþegar til, vinsamlegast finndu nýtt notendanafn';
          res.render('register', {
            renderData:renderData,
            villa:vm
          });
        }

        var success = true;

        if (err || !status) {
          success = false;
        }
        if(success)
          res.render('index', { });

        });
  else {
    var vm='Þetta lykilorð er ekki nógu langt, það er ekkert öryggi falið í því';
          res.render('register', {
            renderData:renderData,
            villa:vm
          });
        }
});

module.exports = router;
