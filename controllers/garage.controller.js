const garageDB = {}
const userController = require('./users.controller');
const axios = require('axios').default;

/* PODRIAMOS FORZAR A LA APP PARA QUE CARGUE INFO AUNQUE NO RECIBA RESPUESTA DEL SERVIDOR.
 * USAR UN FLAG PARA DETERMINAR SI TODA LA INFO SE HA CARGADO, Y EN CASO CONTRARIO CAMBIAR SU ESTADO
 * EN LA SIGUIENTE PETICI�N, ANALIZAR Y SI EL FLAG EST� ABAJO, USAR EL NOMBRE DE LOS COMPONENTES SIN INFO
 * PARA HACER NUEVAMENTE LA PETICI�N AL SERVIDOR Y CARGAR LA INFO FALTANTE
*/





let urlApiCar = 'http://localhost:5001/cars'
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

const getDataCar = (carName, addCar) => {
    url = `${urlApiCar}/byKeyword/${carName}`
    axios.get(url)
        .then(function (response) {
            // handle success
            return addCar(response.data.cars[0]); // Como es una promise, usamos un callback que agrega la info
        })
        .catch(function (error) {
            // handle error
            // VERIFICAR C�MO GESTIONAR EL ERROR CUANDO EL SERVIDOR NO EST� FUNCIONANDO
            // Probablemente en la vida real/producci�n no utilizariamos esta metodolog�a. 
            // En lugar de eso, har�amos que el frontend consultara la api de car para recibir info de los 
            // Veh�culos disponibles, y cuando el usuario los elija, nos devuelve toda la informaci�n.
            console.log('la hemos cagao', error);
        })
        .then(function () {
            // always executed
        });

};


const getUserId = (user) => userController.consultUserId(user);

const createGarage = (user) => {
    userId = getUserId(user);
    garageDB[userId] = []
    // console.log(garageDB)
};


// REVISAR LAS PROMESAS. LA ASINCRON�A NO PERMITE QUE SE INGRESE CORRECTAMENTE Y EN ORDEN
// AUNQUE NO ES UN INCONVENIENTE RELEVANTE, HAY QUE MANEJAR MEJOR LA ASINCRON�A
// LA POSIBLE SOLUCI�N SER�A CREAR UNA PROMESA PARA EVITAR QUE EL FOR NOS DEVUELVA ALGO ANTES DE FINALIZAR EL PROCESO DE CONSULTA

const newCar = (user, cars) => { // Si quisieramos recibir m�ltiples argumentos, podemos usar ... Pero al implementarlo recibimos un array
    // console.log(cars)
    getUserId(user);
    console.log('entramos a new car')
    for (let car of cars) {
        console.log(car)
        getDataCar(car, (carInfo) => { // Esta es la implementaci�n del callback para agregar la info al garage
            // console.log(carInfo)
            garageDB[userId].push(carInfo)
            console.log('Car info es ', carInfo)
        })
        console.log('terminamos car', car)
    }
    // console.log(garageDB[userId])
    // garageDB[userId].push(...cars); // Usamos los ... para sacar los valores del array y pasarlos como string individuales

};

const getGarage = (user) => garageDB[getUserId(user)];



exports.createGarage = createGarage;
exports.newCar = newCar;
exports.getGarage = getGarage;