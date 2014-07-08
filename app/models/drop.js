var db = require('../config');
var Pledge = require('./pledge');


var Drop = db.Model.extend({
  tablename: 'drops',
  hasTimestamps: true,

  pledge: function(){
    return this.belongsTo(Pledge);
  },
});

module.exports = Drop;