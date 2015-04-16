"use strict";

var geocoder = require('geocoder');

module.exports = function(sequelize, DataTypes) {
  var location = sequelize.define("location", {
    locationName: DataTypes.STRING,
    locationDescription: DataTypes.TEXT,
    city: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        models.location.hasMany(models.map)
      }
    },
    hooks: {
      beforeCreate: function(locations, options, fn) {
        geocoder.geocode(locations.locationName + ", " + locations.streetAddress + ", " + locations.city, function(err,data) {
          if (err) { fn(err,null) }
          locations.latitude = data.results[0].geometry.location.lat;
          locations.longitude = data.results[0].geometry.location.lng;
          fn(null,locations);
        })
      }
    }
  });
  return location;
};