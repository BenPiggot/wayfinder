"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      locationName: {
        type: DataTypes.STRING
      },
      locationDescription: {
        type: DataTypes.TEXT
      },
      city: {
        type: DataTypes.STRING
      },
      streetAddress: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      latitude: {
        type: DataTypes.FLOAT
      },
      longitude: {
        type: DataTypes.FLOAT
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
    migration.dropTable("locations").done(done);
  }
};