"use strict";
module.exports = function(sequelize, DataTypes) {
  var map = sequelize.define("map", {
    mapName: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.map.belongsTo(models.user)
        models.map.hasMany(models.location)
        models.map.hasMany(models.tag)
      }
    }
  });
  return map;
};