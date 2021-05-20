const garageDB = {}
const userController = require('./users.controller');
/*
const validation = (req, functionController) => {
    let user = req.body.user;
    let cars = req.body.cars;
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
}*/


const getUserId = (user) => userController.consultUserId(user);




const createGarage = (user) => {
    userId = getUserId(user);
    garageDB[userId] = []
    // console.log(garageDB)
};

const newCar = (user, cars) => { // Si quisieramos recibir múltiples argumentos, podemos usar ... Pero al implementarlo recibimos un array
    // console.log(cars)
    userId = getUserId(user);
    garageDB[userId].push(...cars); // Usamos los ... para sacar los valores del array y pasarlos como string individuales
};

const getGarage = (user) => garageDB[getUserId(user)];

/*
createGarage('pepe')
//newCar('pepe', 1, 2, 3);
//newCar('pepe', 1);
newCar('pepe', 1, 2, 3, 'hola');
newCar('pepe', [43, 54, 65]);*/

exports.createGarage = createGarage;
exports.newCar = newCar;
exports.getGarage = getGarage;