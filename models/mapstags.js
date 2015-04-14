"use strict";
module.exports = function(sequelize, DataTypes) {
  var mapstags = sequelize.define("mapstags", {
    mapId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mapstags;
};