"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("maps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      mapName: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      latitude: {
        type: DataTypes.FLOAT
      },
      longitude: {
        type: DataTypes.FLOAT
      },
      userId: {
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
    migration.dropTable("maps").done(done);
  }
};