"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(user,options,sendback){
        bcrypt.hash(user.password,10,function(err,hash){
          if(err){ throw err; }
          user.password=hash;
          sendback(null,user);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.map)
      }
    }
  });
  return user;
};