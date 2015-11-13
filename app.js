'use strict';

var express = require('express');
// the path module makes working with paths more convenient
var path = require('path');
// makes serving a favicon easy. https://en.wikipedia.org/wiki/Favicon
//var favicon = require('serve-favicon');
// this is the guy logging all the requests to console.
var logger = require('morgan');
// exposes the req.cookies for easy cookie access in routes
var cookieParser = require('cookie-parser');
// exposes the req.body object for easy access to request parameters in routes.
var bodyParser = require('body-parser');


// Make reference to the route-handler scripts we use.
var routes = require('./routes/index');
var find = require('./routes/find');
var form = require('./routes/form');
var sida = require('./routes/sida');
var register = require('./routes/register');
// initialize express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// initialize logger in development mode.
app.use(logger('dev'));
app.use(bodyParser.json());
// initialize body parser
// https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({ extended: false }));
// initialize cookie parser
app.use(cookieParser());
// tell express what should be the basepath for static content in .jade files.
app.use(express.static(path.join(__dirname, 'public')));

// tell express which script should handle which route
app.use('/', routes);
app.use('/form', form);
app.use('/sida', sida);
app.use('/register', register);
app.use('/find', find);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
