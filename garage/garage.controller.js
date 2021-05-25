const garageDB = {}
const userController = require('../auth/users.controller');
const axios = require('axios').default;

let urlApiCar = 'http://localhost:5001/cars'

const getDataCar = (carName, addCar) => {
    url = `${urlApiCar}/byKeyword/${carName}`
    axios.get(url)
        .then(function (response) {
            return addCar(response.data.cars[0]); // Como es una promise, usamos un callback que agrega la info
        })
        .catch(function (error) {
            // VERIFICAR CÓMO GESTIONAR EL ERROR CUANDO EL SERVIDOR NO ESTÁ FUNCIONANDO
            // Probablemente en la vida real/producción no utilizariamos esta metodología. 
            // En lugar de eso, haríamos que el frontend consultara la api de car para recibir info de los 
            // Vehículos disponibles, y cuando el usuario los elija, nos devuelve toda la información.
            console.log('la hemos cagao', error);
        })
        .then(function () {
            // always executed
        });

};

const getUserId = (user) => userController.consultUserId(user);

const createGarage = (userId) => {
    // userId = getUserId(user);
    garageDB[userId] = []
    // console.log(garageDB)
};

const newCar = (user, cars) => { // Si quisieramos recibir múltiples argumentos, podemos usar ... Pero al implementarlo recibimos un array
    // console.log(cars)
    let userId = getUserId(user);
    console.log('este es el userid2 desde new car', userId);
    console.log('entramos a new car')
    for (let car of cars) {
        console.log(car)
        getDataCar(car, (carInfo) => { // Esta es la implementación del callback para agregar la info al garage
            garageDB[userId].push(carInfo)
            // console.log('Car info es ', carInfo)
        })
        // console.log('terminamos car', car)
    }
};

const deleteCar = (user, car) => {
    let userId = getUserId(user);
    for (let id in garageDB[userId]) {
        let nameCar = garageDB[userId][id]['name'];
        if (nameCar == car) {
            console.log(garageDB[userId][id])
            let deleteCarResult = garageDB[userId].splice(id,1);
            return { user, car: deleteCarResult[0].name }
        }
    }
}


const getGarage = (user) => garageDB[getUserId(user)];
const allGarage = () => garageDB;

exports.allGarage = allGarage;
exports.createGarage = createGarage;
exports.newCar = newCar;
exports.getGarage = getGarage;
exports.deleteCar = deleteCar;