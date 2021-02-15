const { ParkingLot, Car, SpotCarMapping, Sequelize } = require('../../models');
const { Op } = Sequelize;
const { success, error } = require('../../http/restResponse');
const { ParkingLotController: pl } = require('../../controllers');

class ParkingLotController {

    async search(req, res) {
        try {
            if (!req.query.spotId && !req.query.regNo) {
                res.status(400).json(error(400, "Slot number or car number is required"));
                return;
            }

            let condition = {};
            condition.where = {};
            condition.include = [];

            condition.where.status = "active";

            condition.attributes = ['id'];

            if (req.query.spotId) {
                condition.where.spotId = req.query.spotId;
            }

            condition.include.push({
                model: ParkingLot,
                as: 'spot',
                attributes: ['id', 'name'],
            })

            let carInclude = {
                model: Car,
                as: 'car',
                attributes: ['id', 'regNo']
            }

            if (req.query.regNo) {
                carInclude.where = {
                    'regNo': req.query.regNo.toLowerCase()
                };
            }

            condition.include.push(carInclude);

            let result = await SpotCarMapping.findOne(condition);

            let response = {};
            if (result) {
                response = {
                    'slotNumber': result.spot.id,
                    'carNumber': result.car.regNo.toUpperCase()
                };
            } else {
                response = {
                    'code': 200,
                    'message': "No data."
                };
            }

            res.status(200).json(success(response));
        } catch (e) {
            console.log(e)
            res.status(500).json(error(500, "Something went wrong."));
        }
    }

    async parkCar(req, res) {
        try {
            const regNo = req.body.regNo.toLowerCase();

            const car = await pl.getCarDetails(regNo);

            await pl.checkIfCarAlreadyParked(car);

            const spot = await pl.getEmptySpot();

            const result = await SpotCarMapping.create({ "carId": car.id, "spotId": spot.id, "status": "active" });

            res.status(200).json(success({ "code": 200, "message": "Car parked successfully." }));

        } catch (e) {
            console.log(e)
            if (e.status && e.message) {
                res.status(e.status).json(error(e.status, e.message));
            } else {
                res.status(500).json(error(500, "Something went wrong."));
            }
        }
    }

    async unparkCar(req, res) {
        try {

            const spotId = req.body.spotId;

            const isActive = await SpotCarMapping.findOne({ where: { "spotId": spotId, "status": "active" } });
            if (isActive) {
                isActive.update({ "status": "delete" });

                res.status(200).json(success({
                    "code": 200,
                    "message": "Car unparked successfully."
                }));
            } else {
                res.status(400).json(error(400, "Slot is already empty."));
            }
        } catch (e) {
            console.log(e)
            if (e.status && e.message) {
                res.status(e.status).json(error(e.status, e.message));
            } else {
                res.status(500).json(error(500, "Something went wrong."));
            }
        }
    }
}

module.exports = new ParkingLotController();