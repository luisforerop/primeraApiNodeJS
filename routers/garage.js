const express = require('express');
const router = express.Router();
// LIBRÉRÍAS
const passport = require('passport');
// Importamos nuestro código de auth js y llamamos a la función passport pasandole el objeto de passport:
require('../auth')(passport); // Activamos passport
const garageController = require('../controllers/garage.controller');
const userController = require('../controllers/users.controller');


// En lugar de usar el /team, usamos solo / porque ya está en el enrutador de teams
router.route('/')
    .get(passport.authenticate('jwt', { session: false }),     // Usamos como middleware para proteger el ingreso a team la función passport
        // Definimos nuestra función handler
        (req, res) => {
            let user = req.user.user; // Passport carga la información de usuario en req.user

            if (user) {
                let garage = garageController.getGarage(user)
                return res.status(200).json({user, garage})
            } else {
                return res.status(400).send('Sin datos')
            }
            console.log(req.body.user, 'El nombre de usuario en get garage por req')
            return res.status(200).json({prueba: true})
            
        })
    .put((req, res) => {
        res.status(200).send('Modo PUT de team')
        // Para evitar inconvenientes no vamos a implementar put ya que con los métodos de post y delete se incluyen las 
        // funcionalidades que podría necesitar el usuario para modificar paso a paso su garaje
    })
    .post(passport.authenticate('jwt', { session: false }),
        (req, res) => {
            // Para la implementación en el front, hay que aclarar que los vehículos siempre se mandan en arrays.
            // Esto nos permite ingresar uno o varios vehículos en una misma petición.
            let user = req.body.user;
            let cars = req.body.cars;
            console.log(`Estos son los carros: ${cars} y este es el usuario: ${user}`)
            if (user) {
                //var userId = userController.consultUserId(user);
                garageController.newCar(user, cars);
                let toSend = 'New cars add: ' + cars
                return res.status(200).send(toSend)
                // console.log('este es user id', userId);
            } else {
                // console.log('Sin datos')
                return res.status(400).send('Sin datos')
            }

    });

router.route('/garage/:id/:prueba')
    .delete((req, res) => {
        res.status(200).send('mucho texto');
    })
    .post((req, res) => {
        res.status(200).send(req.params);
    });


router.route('/newCars')


exports.router = router;
