'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig}=require('../config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: 'User_roles', as:'role' ,foreignKey:'user_id'});
    }
  }
  User.init({
    userName: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,50]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  //console.log(typeof(ServerConfig.SALTROUNDS));
  User.beforeCreate(function createHashpassword(user, options){
    const hashPassword = bcrypt.hashSync(user.password,+ServerConfig.SALTROUNDS);
    user.password=hashPassword;
    });
  return User;
};