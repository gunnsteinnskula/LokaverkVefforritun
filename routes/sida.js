'use strict';

var express = require('express');
var router = express.Router();
router.post('/', tagOnTheWallHandler);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('sida', {  });
});

function tagOnTheWallHandler(req, res, next){
  var text = req.body.text;
  var sitename=req.body.sitename;
  var user = req.session.user;
  entries.createEntry(user.username, sitename, text, function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;

    if (err || !status) {
      success = false;
    }
    index(req, res, next);
  });
}

module.exports = router;
