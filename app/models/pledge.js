var db = require('../config');
var Bucket = require('./bucket');
var Drop = require('./drop');
var User = require('./user');

var Pledge = db.Model.extend({
  tableName: 'pledges',
  hasTimestamps: true,

  bucket: function(){
    return this.belongsTo(Bucket);
  },

  user: function(){
    return this.belongsTo(User);
  }

  drops: function(){
    return this.hasMany(Drop);
  },


});

module.exports = Pledge;