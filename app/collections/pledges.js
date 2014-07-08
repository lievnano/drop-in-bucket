var db = require('../config');
var Pledge = require('../models/pledge');

var Pledges = new db.Collection();

Pledges.model = Pledge;

module.exports = Pledges;