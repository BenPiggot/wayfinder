"use strict";

var geocoder = require('geocoder');

module.exports = function(sequelize, DataTypes) {
  var map = sequelize.define("map", {
    mapName: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      models.map.belongsTo(models.user)
      models.map.hasMany(models.location)
      models.map.hasMany(models.tag)
      }
    },
    hooks: {
      beforeCreate: function(map, options, fn) {
        geocoder.geocode(map.city, function(err,data) {
          if (err) { fn(err,null) }
          map.latitude = data.results[0].geometry.location.lat;
          map.longitude = data.results[0].geometry.location.lng;
          fn(null,map);
        })
      }
    }
  });
  return map;
};