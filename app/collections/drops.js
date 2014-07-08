var db = require('../config');
var Drop = require('../models/drop');

var Drops = new db.Collection();

Drops.model = Drop;

module.exports = Drops;