'use strict';

var express = require('express');
var router = express.Router();
var friends = require('../lib/users');

router.get('/', function(req, res) {
	res.render('search', { title:'Express'});
});

router.post('/', function(req, res) {
	friends.addFriend(req.session.user.username, req.body.friendName , function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;

    if (err || !status) {
      success = false;
    }
    if(success)
      err='Vini hefur verið bætt við, nú er bara að bíða eftir að hann svari'

    return res.render('search', { title: 'Create user', post: true, success: success, respond:err })
  });
});

module.exports = router;