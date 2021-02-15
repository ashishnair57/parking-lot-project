'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotCarMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotCarMapping.belongsTo(models.Car, { foreignKey: 'carId', as: 'car', target: 'id' });
      SpotCarMapping.belongsTo(models.ParkingLot, { foreignKey: 'spotId', as: 'spot', target: 'id' });
    }
  };
  SpotCarMapping.init({
    carId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpotCarMapping',
  });
  return SpotCarMapping;
};