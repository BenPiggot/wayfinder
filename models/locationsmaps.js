"use strict";
module.exports = function(sequelize, DataTypes) {
  var locationsmaps = sequelize.define("locationsmaps", {
    locationId: DataTypes.INTEGER,
    mapId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return locationsmaps;
};