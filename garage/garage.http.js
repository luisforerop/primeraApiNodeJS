// MÓDULOS
const garageController = require('./garage.controller');


const getGarageByUserId = // passport.authenticate('jwt', { session: false }),     // Usamos como middleware para proteger el ingreso a team la función passport
    // Ya no usamos passport porque configuramos todo en middleware.js
    // Definimos nuestra función handler
    (req, res) => {

        let user = req.user.user; // Passport carga la información de usuario en req.user
        let userId = req.body.userId;
        if (userId) {
            let garage = garageController.getGarage(userId)
            console.log('este es garage desde http', garage)
            return res.status(200).json({ user, garage })
        } else {
            return res.status(400).send('Sin datos')
        }
        // console.log(req.body.user, 'El nombre de usuario en get garage por req')
    };

const newCars = // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // Para la implementación en el front, hay que aclarar que los vehículos siempre se mandan en arrays.
        // Esto nos permite ingresar uno o varios vehículos en una misma petición.
        let cars = req.body.cars;
        let userId = req.body.userId;
        //console.log(`Estos son los carros: ${cars} y este es el usuario: ${user}`)
        if (userId) {
            //var userId = userController.consultUserId(user);
            garageController.newCar(userId, cars);
            let toSend = 'New cars add: ' + cars
            return res.status(200).send(toSend)
            // console.log('este es user id', userId);
        } else {
            // console.log('Sin datos')
            return res.status(400).send('Sin datos')
        }
    }

const deleteCar = // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let user = req.body.user;
        let userId = req.body.userId;
        let car = req.body.car;
        console.log('este es el body. llamado desde deletecar:', req.body);
        //console.log(`Estos son los carros: ${cars} y este es el usuario: ${user}`)
        if (userId) {
            //var userId = userController.consultUserId(user);
            let response = garageController.deleteCar(user, userId, car);
            console.log('aqui debería ir el carro y el user', response)
            return res.status(200).json(response);
            // console.log('este es user id', userId);
        } else {
            // console.log('Sin datos')
            return res.status(400).send('Sin datos')
        }
    }

const dbcars = (req, res) => {
    let garageDb = garageController.allGarage();
    res.status(200).json(garageDb)
}

/*
router.route('/garage/:id/:prueba')
    .delete((req, res) => {
        res.status(200).send('mucho texto');
    })
    .post((req, res) => {
        res.status(200).send(req.params);
    });
*/

exports.getGarageByUserId = getGarageByUserId;
exports.newCars = newCars;
exports.deleteCar = deleteCar;
exports.dbcars = dbcars;