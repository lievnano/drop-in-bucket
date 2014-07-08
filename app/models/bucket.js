var db = require('../config');
var User = require('./user');
var Pledge = require('./pledge');

var Bucket = db.Model.extend({
  tableName: 'buckets',
  hasTimestamps: true,
  
  user: function(){
    return this.belongsTo(User);
  },

  pledges: function(){
    return this.hasMany(Pledge)
  }


});

module.exports = Bucket;