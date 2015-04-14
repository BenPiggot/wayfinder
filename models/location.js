"use strict";
module.exports = function(sequelize, DataTypes) {
  var location = sequelize.define("location", {
    locationName: DataTypes.STRING,
    locationDescription: DataTypes.TEXT,
    city: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.location.hasMany(models.map)
      }
    }
  });
  return location;
};