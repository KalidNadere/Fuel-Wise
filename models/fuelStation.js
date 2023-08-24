const { DataTypes } = require('sequelize');
const db = require('../config/config');

const FuelStation = db.define('FuelStation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricePerUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  distance: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
  },
});

module.exports = FuelStation;
