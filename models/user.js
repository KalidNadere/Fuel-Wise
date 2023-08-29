const { Model, DataTypes } = require('sequelize'); // Import the DataTypes object from the Sequelize library.
const sequelize = require('../config/config') // Import database connection
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

const User = (
  {
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
    validate: {
      len: [8],
    },
  },
},
{
  hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
});

module.exports = User;