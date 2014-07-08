var db = require('../config');
var Bucket = require('../models/bucket');

var Buckets = new db.Collection();

Buckets.model = Bucket;

module.exports = Buckets;