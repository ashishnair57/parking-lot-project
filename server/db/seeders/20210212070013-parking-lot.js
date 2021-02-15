'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let spotsArr = [];
    for (let i = 1; i <= process.env.PARKING_SLOTS; i++) {
      let tmpObj = {};
      tmpObj.name = 'Spot ' + i;
      tmpObj.createdAt = new Date()
      tmpObj.updatedAt = new Date()
      spotsArr.push(tmpObj)
    }
    await queryInterface.bulkInsert('ParkingLots', spotsArr, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ParkingLots', null, {});
  }
};
