var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var connect = require('connect');
var multipart = require('connect-multiparty');
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
var session = require('express-session')
var expressHbs = require('express3-handlebars')
var multipartMiddleware = multipart();

var app = express();
// app.use(express.urlencoded());
// app.use(connect.urlencoded())

app.use(session({
  secret: 'hdshfaeurp33afad687N3XCND342',
  cookie: {maxAge : 1800},
  // cookie: {secure: true}, set later once https setup...

}));
//change secret when using in production...


app.engine('hbs', expressHbs({extname:'hbs',defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// app.use( express.static(__dirname + '/public'));

app.get('/', function(req,res){
  var activeUser = false;
  if (req.session.user){
    var activeUser = true;
  }
  //get trending buckets
  //get latest buckets
  //show user buckets -- if logged in...
  var data = {activeUser: activeUser, }; // assign various objects
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
  var activeUser = false;
  if (req.session.user){
    var activeUser = true;
  }
  //get user data

  res.render('user', data);
});

// app.use('/signup', multipartMiddleware);
  app.use('/signup', bodyParser.urlencoded({ extended: false }))

app.post('/signup', function(req, res){

  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  // check to see if username is valid
  // if (!util.isValidUsername(username)){
  //   console.log('some shit');
  //   return res.send(404);
  // }
  // if (!util.isValidPassword(password)){
  //   console.log('some oher shit');
  //   return res.send(404);
  // }
  new User({username: username}).fetch().then(function(found) {
    if (found) {
      console.log('tell user they need a unique userid');
      res.render('/signup', {error: 'Username already in use!'});
    } else {
      var user = new User({
        username: username,
        email: email,
      });
      user.saveToDB(password, function(newUser){
        Users.add(user);
        res.redirect('/login');
      });
    }
  });
});

app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var lastpage = req.session.lastpage;
  new User({username: username}).fetch().then(function(user) {
    if (user) {
      user.checkPassword(password, function(result) {
        if (result) {
          req.session.regenerate(function(err){
            if (err) throw err;
            req.session.user = user.get('id');
            if (lastpage){
              res.redirect(lastpage);
            }
            else{
              res.redirect('/');
            }
          })
        } else {
          console.log('Bad password');
          res.render('/login', {error:'Incorrect Username or Password'});
        }
      });
    }
    else{
      console.log('non-existant Username');
      res.render('/login', {error:'Incorrect Username or Password'});
    }
  });
});

app.post('/create', function(req,res){
  //check if user is logged in and authorized
  //check if bucket exists...
  
});

app.post('/bucket:url', function(req,res){

});

console.log('listening on port: 8765')
app.listen(8765);
