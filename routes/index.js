var express = require('express');
var router = express.Router();
var users=require('../lib/users');
/* GET home page. */
router.get('/', loggedInOrNot);
router.post('/', loginHandler);
router.get('/logout', logoutHandler);

router.post('/respondfriend', function(req, res) {
    var whatUserSent = req.body.pressed;
    doAction(req, res, whatUserSent);
  });




function loggedInOrNot(req, res, next) {
	if (req.session.user) {
		var user=req.session.user;
		users.listFriends(user.username, false, function(err, results){
			res.render('index', {
				user:user,
				requests:results
			});
		});
	}
	else {
		res.render('index', {title: 'Express'});
	}
}

function doAction(req, res, value){
  var o = value.split(" ");
  var respond;
  if(o[0]==='Samþykja')
    respond=true;
  else respond=false;
  console.log('þetta er respindið: '+ respond)
  users.respondFriend(req.session.user.username, o[1], respond, function (err, status) {
    if (err) {
      //verð að kippa þessu í lag
      res.redirect('/form');
    } else {
      //verð að kippa þessu í lag
        res.redirect('/search');
      }
  });
}

function loginHandler(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  users.auth(username, password, function (err, user) {
    if (user) {
      req.session.regenerate(function (){
        req.session.user = user;
        res.redirect('/');
      });
    } else {
      var data = {
        villa: 'villa við auðkenningu',
        username: username,
        error: true
      };
      console.log(data);
      res.render('index', {data:data});
    }
  });
}


function logoutHandler(req, res, next) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

module.exports = router;

