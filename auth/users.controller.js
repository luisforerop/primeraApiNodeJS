const uuid = require('uuid'); // Librería para generar identificadores únicos
const crypto = require('../tools/crypto'); // Importamos nuestra función de crypto
const garage = require('../garage/garage.controller')

const usersDatabase = {};

const dbConsult = () => usersDatabase;

const consultUserId = (userName) => {
    // console.log('este es user name en user controller', userName)
    // console.log('este es uderDb', usersDatabase);
    for (let userId in usersDatabase) {
        match = usersDatabase[userId]['userName'] == userName;
        if (match) {
            return userId
        }
    }
};

const userExist = (userName) => {
    if (Object.keys(usersDatabase).length === 0) {
        console.log('estoy vacio');
        return false
    }

    for (let userId in usersDatabase) {
        match = usersDatabase[userId]['userName'] == userName;
        if (match) {
            console.log('match');
            return true
        } 
    }
    return false
};


const registerUsers = (userName, password , /*done*/) => {
    // Guardar en el diccionario
    // Generamos un id único usando uuid.v4
    // Mi implementación
    crypto.hashPassword(password, (err, hashPassword) => {
        let userId = uuid.v4();
        garage.createGarage(userId);
        usersDatabase[userId] = {
            'userName': userName,
            // Usando el script de crypto almacenamos la constraseña hasheada
            'password': hashPassword
        }

        //done(usersDatabase);
    });
}; 


const registerUserSync = (userName, password) => {
    // Revisamos si hay una existencia
    exist = userExist(userName);
    if (exist) {
        return 'userExist'
    } else {
        let userId = uuid.v4();
        garage.createGarage(userId); // Creamos un garage sin contenido
        usersDatabase[userId] = {
            'userName': userName,
            'password': crypto.hashPasswordSync(password)
        }
        return  userId
    }

}

const checkUsersCredentials = (user, password, done /*función callback que viene de la petición*/) => {
    let userId = consultUserId(user);
    let userDB = usersDatabase[userId];
    crypto.comparePassword(password, userDB.password, done); // Done es una función callback que enviamos al crypto y equivale al done de los parámetros
};

exports.registerUsers = registerUsers;
exports.checkUsersCredentials = checkUsersCredentials;
exports.registerUserSync = registerUserSync;
exports.consultUserId = consultUserId;
exports.dbConsult = dbConsult;
exports.userExist = userExist;
