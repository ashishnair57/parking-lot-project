const { ParkingLot, Car, SpotCarMapping, Sequelize } = require('../models');
const { Op } = Sequelize;

class ParkingLotController {

    async getEmptySpot() {

        const filledSpots = await this.getFilledSpots();

        const allSpots = await ParkingLot.findOne({ where: { "id": { [Op.notIn]: filledSpots } }, order: [['id', 'ASC']] });

        if (!allSpots) {
            const err = new Error();
            err.name = "error";
            err.message = "Parking full.";
            err.status = 400;
            throw err;
        }

        return allSpots;
    }

    async getCarDetails(regNo) {
        let result = await Car.findOne({ where: { 'regNo': regNo } });

        if (!result) {
            result = await Car.create({ "regNo": regNo });
        }

        return result;
    }

    async getFilledSpots() {
        const filledSpots = await SpotCarMapping.findAll({ where: { "status": "active" }, attributes: ['id'] })
        const fillerSpotsArr = [];
        filledSpots.map((row, index) => {
            fillerSpotsArr[index] = row.id
        })
        return fillerSpotsArr;
    }

    async checkIfCarAlreadyParked(car) {
        const isExists = await SpotCarMapping.findOne({
            where: { "status": "active", "carId": car.id }, include: [{
                model: ParkingLot,
                as: 'spot',
                attributes: ['id', 'name'],
            }, {
                model: Car,
                as: 'car',
                attributes: ['id', 'regNo'],
            }]
        })

        if (isExists) {
            const err = new Error();
            err.name = "error";
            err.message = "Duplicate entry found: Car with registration number " + isExists.car.regNo + " is already parked on " + isExists.spot.name;
            err.status = 400;
            throw err;
        }
    }
}

module.exports = new ParkingLotController();