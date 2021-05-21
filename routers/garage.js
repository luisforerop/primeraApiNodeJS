const express = require('express');
const router = express.Router();
// LIBR�R�AS
const passport = require('passport');
// Importamos nuestro c�digo de auth js y llamamos a la funci�n passport pasandole el objeto de passport:
require('../auth')(passport); // Activamos passport



// M�DULOS
const garageController = require('../controllers/garage.controller');


// En lugar de usar el /team, usamos solo / porque ya est� en el enrutador de teams
router.route('/')
    .get(passport.authenticate('jwt', { session: false }),     // Usamos como middleware para proteger el ingreso a team la funci�n passport
        // Definimos nuestra funci�n handler
        (req, res) => {
            let user = req.user.user; // Passport carga la informaci�n de usuario en req.user

            if (user) {
                let garage = garageController.getGarage(user)
                console.log('este es garage desde router', garage)
                return res.status(200).json({user, garage})
            } else {
                return res.status(400).send('Sin datos')
            }
            // console.log(req.body.user, 'El nombre de usuario en get garage por req')
            // return res.status(200).json({prueba: true})
            
        })
    .put((req, res) => {
        res.status(200).send('Modo PUT de team')
        // Para evitar inconvenientes no vamos a implementar put ya que con los m�todos de post y delete se incluyen las 
        // funcionalidades que podr�a necesitar el usuario para modificar paso a paso su garaje
    })
    .post(passport.authenticate('jwt', { session: false }),
        (req, res) => {
            // Para la implementaci�n en el front, hay que aclarar que los veh�culos siempre se mandan en arrays.
            // Esto nos permite ingresar uno o varios veh�culos en una misma petici�n.
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
