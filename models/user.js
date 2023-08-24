const { DataTypes } = require('sequelize'); // Import the DataTypes object from the Sequelize library.
const db = require('../config/config') // Import database connection

const User = db.define('User', {
  username: {
    type: DataTypes.STRING, // The DataTypes object from Sequelize is used to specify the data types of the model properties.
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING, // Datatype of the property+ is string
    allowNull: false, // The email property cannot by null
    unique: true, // Email column must be unique, not similar another email in the database
    validate: {
      isEmail: true, // The email entered is valid
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;