var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var methodOverride = require("method-override");
var session = require("express-session");
var csurf = require("csurf");
var flash = require("connect-flash");
var mongoose = require("mongoose");

var routes = require('./routes/index');

var app = express();

// データベースを接続
mongoose.connect("mongodb://localhost/blog");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HTTP METHOD を上書き
// https://github.com/expressjs/method-override#custom-logic
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// SessionとCSRF、flashメッセージの設定
app.use(session({
    secret: "keyword cat",
    resave: false,
    saveUninitialized: false
}));
app.use(csurf());
app.use(flash());

app.use('/', routes);

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
