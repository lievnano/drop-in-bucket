var db = require('../config');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var Bucket = require('./bucket');
var Pledge = require('./pledge');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps:true,

  buckets: function(){
    return this.hasMany(Bucket);
  },

  pledges: function(){
    return this.hasMany(Pledge);
  }

  saveToDB: function(pswd, callback){
    var context = this;
    bcrypt.genSalt(12, function(err, salt){
      if (err) throw err;

      bcrypt.genSalt(12, function(err, salt){
      if (err) throw err;

      bcrypt.hash(pswd, salt, null, function(err, hash) {
        if (err) {
          throw err;
        }
        context.set('password', hash);
        context.save();
        callback(context);
      });
    });
  },

  checkPassword: function(password, callback) {
    bcrypt.compare(password, this.get('password'), function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

});

module.exports = User;
