'use strict';

var moment = require('moment');
moment.locale('is');
var express = require('express');
var router = express.Router();
var sites = require('../lib/sites');
var entries = require('../lib/wall');
var users = require('../lib/users');

/* Connect all pages. */
router.get('/find', listSitesHandler);
router.post('/find', getSiteHandler);
router.get('/form', getForm);
router.post('/form', newSite);
router.get('/friends', getFriends);
router.post('/friends', postFriendsHandler);
router.get('/', loggedInOrNot);
router.post('/', loginHandler);
router.get('/logout', logoutHandler);
router.post('/respondfriend', respond);
router.get('/profile', getProfile);
router.post('/profile', getSiteHandler);
router.get('/register', getRegister);
router.post('/register', postRegister);
router.get('/search', getSearch);
router.post('/search', postSearch);
router.get('/sida', getExample);


function getExample(req, res, next){
  index(req, res, next, 'example');
}

function postSearch(req, res) {
  users.addFriend(req.session.user.username, req.body.friendName , function (err, status) {
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
}

function getSearch(req, res) {
  res.render('search', { title:'Express'});
}

function postRegister(req,res){
  var renderData={
  username:req.body.username,
  name:req.body.name,
  pf:req.body.pf,
  home:req.body.adresse,
  email:req.body.email,
  pn:req.body.pn,
  description:req.body.description,
  gender:req.body.gender,
  pw:req.body.pw};
  if(renderData.pw!=='')
    users.createUser(renderData.username, renderData.name, renderData.pw, renderData.pf, renderData.home, renderData.email, renderData.pn, renderData.description, renderData.gender, function (err, status) {
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
          res.redirect('/');

        });
  else {
    var vm='Þetta lykilorð er ekki nógu langt, það er ekkert öryggi falið í því';
          res.render('register', {
            renderData:renderData,
            villa:vm
          });
        }
}




function getRegister(req, res) {
  var renderData={};
  res.render('register', { renderData:renderData });
}

function getProfile(req, res) {
  var user=req.session.user;
  users.listFriends(user.username, true, function (err, friendsList){
    users.listFriends2(user.username, true, function (err, friendsList2){
      sites.gef(user.username, function (err, siteList) {
        res.render('profile', {
          user:req.session.user,
          sites: siteList,
          friends: friendsList.concat(friendsList2)
        });
      });
    });
  });
}

function respond(req, res) {
    var whatUserSent = req.body.pressed;
    doAction(req, res, whatUserSent);
}

function loggedInOrNot(req, res, next) {
	if (req.session.user) {
		var user=req.session.user;
			users.listFriends(user.username, false, function (err, results){
				var reqstatus = results.length;
				res.render('index', {
					user:user,
					requests:results,
					reqstatus:reqstatus
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
   });
  res.send(200);
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


function postFriendsHandler(req, res, next) {
  if(req.body.friendsval){
    users.listFriends(req.body.friendsval, true, function (err, friendsList){
      users.listFriends2(req.body.friendsval, true, function (err, friendsList2){
        sites.gef(req.body.friendsval, function (err, siteList) {
          users.fu(req.body.friendsval, function (err, results){
            res.render('profile', {
              user:results,
              sites: siteList,
              friends: friendsList.concat(friendsList2)
            });
          });
        });
      });
    });
  }
  if(req.body.val)
    index(req, res, next, req.body.val);

  if(req.body.text){
    tagOnTheWallHandler(req,res, next)  
  }
}
function getFriends(req, res) {
  users.listFriends(req.session.user.username, true, function (err, userList) {
    users.listFriends2(req.session.user.username, true, function (err, userList2) {
      res.render('friends', {
        friends: userList.concat(userList2)
      });
    });
  });
}



function newSite(req, res, next) {
  if(req.body.text)
    tagOnTheWallHandler(req,res, next)  
  else{
    var renderData={
      sitename:req.body.sitename,
      username:req.session.user.username,
      name:req.body.name,
      background:req.body.background,
      subheader:req.body.subheader,
      pf:req.body.pf,
      description:req.body.description
    };
    if(renderData.background === ''){
      renderData.background = 'http://i.imgur.com/ZXDrw5D.gif'
    }
    sites.createSite(renderData.username, renderData.name, renderData.background, renderData.subheader, renderData.pf, renderData.description, renderData.sitename, function (err, status) {
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
        index(req, res, next, renderData.sitename);
      }
      
    });
  }
}

function getForm(req, res) {
  var renderData={};
  res.render('form', { renderData:renderData,
    errors:[] });
  var user=req.session.user;
  console.log(user);
}
  
function listSitesHandler(req, res) {
    sites.gef(req.session.user.username, function (err, siteList) {
    res.render('find', {
      sites: siteList
    });
  });
}

function getSiteHandler(req, res,next) {
  if(req.body.val){
    index(req, res, next, req.body.val);
    }
  if(req.body.text){
    tagOnTheWallHandler(req,res,next) 
  }
}

function tagOnTheWallHandler(req, res, next){
  console.log(req.body.text + req.body.sitename);
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
    index(req, res, next, req.body.sitename);
  });
}

function index(req, res, next, value) {
  var user = req.session.user;
  entries.listWriting(value, function (err, entryList) {
      entryList.forEach(function(e,i,a) {
    var time = moment(e.date).format('LLL');
      e.date = time;
    });
    sites.findSite(value, function(err, siteInfo){
      var renderData={
        sitename:siteInfo[0].sitename,
        username:siteInfo[0].username,
        name:siteInfo[0].name,
        background:siteInfo[0].bpurl,
        subheader:siteInfo[0].subheader,
        pf:siteInfo[0].purl,
        description:siteInfo[0].text};
      var data={
        renderData:renderData,
        entries: entryList.reverse()};
      res.render('sida', data)
      });
      });
    }

module.exports = router;
