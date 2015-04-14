"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("mapstags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      mapId: {
        type: DataTypes.INTEGER
      },
      tagId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("mapstags").done(done);
  }
};