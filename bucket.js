var express = require('express');
var http = require('http');
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

