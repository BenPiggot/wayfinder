"use strict";
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define("tag", {
    tagName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.tag.hasMany(models.map)
      }
    }
  });
  return tag;
};