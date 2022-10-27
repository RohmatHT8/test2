'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Company, {foreignKey:"CompanyId"})
    }
  }
  Employee.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {msg: "First Name required"}
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {msg: "Last Name required"}
      }
    },
    CompanyId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};