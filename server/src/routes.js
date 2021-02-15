const express = require('express');
const router = express.Router();
const { requestValidator, rateLimiter } = require('./middleware');
const { ParkingLotController } = require('./controllers/Api');

module.exports = () => {

    router.get('/parkingLot', rateLimiter, requestValidator('parkingLot'), ParkingLotController.search);

    router.post('/parkingLot/parkCar', rateLimiter, requestValidator('parkCarSchema'), ParkingLotController.parkCar);

    router.post('/parkingLot/unparkCar', rateLimiter, requestValidator('unparkCarSchema'), ParkingLotController.unparkCar);

    return router;
}


