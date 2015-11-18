var express = require('express');
var router = express.Router();
var users=require('../lib/users');
/* GET home page. */
router.get('/', loggedInOrNot);
router.post('/', loginHandler);
router.get('/logout', logoutHandler);






function loggedInOrNot(req, res, next) {
	if (req.session.user) {
		var user=req.session.user;
		users.listFriends(user.username, false, function(err, results){
      console.log(results);
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

function doAction(value){
  console.log(value);
  var res = value.split(" ");
  var respond;
  if(res[0]==='Samþykja')
    respond=true;
  else respond=false
  
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
        title: 'Login',
        username: username,
        error: true
      };
      res.render('index', {title: 'Express'});
    }
  });
  next;
}


function logoutHandler(req, res, next) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

module.exports = router;

