const { Model,  DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class FuelStation extends Model {}

FuelStation.init(
  {
    brand_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    station_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName:true,
    underscored: true,
    modelName:'fuelStation'
  }
)

module.exports = FuelStation;
