const garageDB = {}
// MÓDULOS
const to = require('../tools/promisesManagement').to;
const mongoose = require('mongoose');
const axios = require('axios').default;

// MODELO DB
const schemaGarage = mongoose.Schema({
    userId: String,
    garage: []
});

const garageModel = mongoose.model('garage', schemaGarage);

/*
const hyperCar= mongoose.model('hyperCar', { name: String });
const ferrari = new hyperCar({ name: 'Ferrari La Ferrari' });
ferrari.save().then(() => console.log('Nuevo carro guardado'));*/


let urlApiCar = 'http://localhost:5001/cars'

const getDataCar = async (carName, addCar) => {
    url = `${urlApiCar}/byKeyword/${carName}`
    // HACEMOS PETICIÓN Y GESTIONAMOS PROMESA CON AWAIT
    let [err, response] = await to( axios.get(url) );
    if (response || !err) {
        return response.data.cars[0]
    }
    else {
        console.log('Error:', err);
        return err
    }
};

const createGarage = (userId) => {
    return new Promise((resolve, reject) => {
        return resolve(garageDB[userId] = [])
    })
};

const newCar = (userId, cars) => { // Si quisieramos recibir múltiples argumentos, podemos usar ... Pero al implementarlo recibimos un array
    return new Promise(async (resolve, reject) => {
        for (let car of cars) {
            let carInfo = await getDataCar(car);
            garageDB[userId].push(carInfo)
        }
        resolve({message: 'Cars add'})
    });
};

const deleteCar = (user, userId, car) => {
    return new Promise((resolve, reject) => {
        for (let id in garageDB[userId]) {
            let nameCar = garageDB[userId][id]['name'];
            if (nameCar == car) {
                let deleteCarResult = garageDB[userId].splice(id, 1);
                // Para confirmar devolvemos el usuario el vehículo eliminado
                return resolve({ user, car: deleteCarResult[0].name }); 
            }
        }
    });
}


const getGarage = userId => {
    return new Promise((resolve, reject) => {
        return resolve(garageDB[userId]);
    })
};

const allGarage = () => garageDB;

exports.allGarage = allGarage;
exports.createGarage = createGarage;
exports.newCar = newCar;
exports.getGarage = getGarage;
exports.deleteCar = deleteCar;