var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Buckets = require('./app/collections/buckets');
var Bucket = require('./app/models/bucket');
var Pledges = require('./app/collections/pledges');
var Pledge = require('./app/models/pledge');
var Drops = require('./app/collections/drops');
var Drop = require('./app/models/drop');

var app = express();
var expressHbs = require('express3-handlebars')
app.engine('hbs', expressHbs({extname:'hbs',defaultLayout:'main.hbs'}));

// app.use( express.static(__dirname + '/public'));
// app.use(bodyParser.json());

app.get('/', function(req,res){
  //get trending buckets
  //get latest buckets
  //show user buckets -- if logged in...
  var data = {}; , assign various objects
  res.render('index', data); //render it
});

app.get('/login', function(req,res){
  res.render('login');
});

app.get('/signup', function(req,res){
  res.render('signup');
});

app.get('/bucket/:url', function(req,res){
  //see if bucket url exists and get data if so or go to location if not

  // if exists render with data
  res.render('bucket', data);
});

app.get('/user', function(req,res){
  //get user data

  res.render('user', data);
});

