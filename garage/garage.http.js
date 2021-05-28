// MÓDULOS
const garageController = require('./garage.controller');


const getGarageByUserId = // passport.authenticate('jwt', { session: false }),     // Usamos como middleware para proteger el ingreso a team la función passport
    // Ya no usamos passport porque configuramos todo en middleware.js
    // Definimos nuestra función handler
    async (req, res) => {

        let user = req.user.user; // Passport carga la información de usuario en req.user
        let userId = req.body.userId;
        if (userId) {
            let garage = await garageController.getGarage(userId)
            return res.status(200).json({ user, garage })
        } else {
            return res.status(400).send('Sin datos')
        }
    };

const newCars = async (req, res) => {
        // Para la implementación en el front, hay que aclarar que los vehículos siempre se mandan en arrays.
        // Esto nos permite ingresar uno o varios vehículos en una misma petición.
        let cars = req.body.cars;
        let userId = req.body.userId;
        if (userId) {
            await garageController.newCar(userId, cars);
            let toSend = `New cars add: ${cars}`
            return res.status(200).send(toSend)
        } else {
            return res.status(400).send('Sin datos')
        }
    }

const deleteCar = async (req, res) => {
        let user = req.body.user;
        let userId = req.body.userId;
        let car = req.body.car;
        if (userId) {
            let response = await garageController.deleteCar(user, userId, car);
            return res.status(200).json(response);
        } else {
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