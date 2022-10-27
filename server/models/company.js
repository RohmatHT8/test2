'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Employee, { foreignKey:"CompanyId" })
    }
  }
  Company.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {msg: "name required"},
        notEmpty: {msg: "name required"}
      }
    },
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};