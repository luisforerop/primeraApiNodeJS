const express = require('express');
const router = express.Router();

// M�DULOS
const garageHttpHandler = require('./garage.http');

router.route('/')
    .get(garageHttpHandler.getGarageByUserId)
    .post(garageHttpHandler.newCars)
    .delete(garageHttpHandler.deleteCar)

router.route('/dbcars')
    .get(garageHttpHandler.dbcars)

exports.router = router;
