"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
          }
        },
    username: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [8,200]
        }
      }
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