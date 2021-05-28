const uuid = require('uuid'); // Librería para generar identificadores únicos
const crypto = require('../tools/crypto'); // Importamos nuestra función de crypto
const to = require('../tools/promisesManagement').to;
const garage = require('../garage/garage.controller');

const usersDatabase = {};

const dbConsult = () => usersDatabase;

const consultUserId = (userName) => {
    return new Promise((resolve, reject) => {
        for (let userId in usersDatabase) {
            match = usersDatabase[userId]['userName'] == userName;
            if (match) {
                return resolve(userId);
            }
        }
        reject({message: 'No user with this username'})
    });
};


const userExist = (userName) => {
    return new Promise((resolve, reject) => {
        // EVALUACIÓN PARA DB VACÍA
        if (Object.keys(usersDatabase).length === 0) {
            reject({ message: 'empty' })
        }
        // BÚSQUEDA Y MATCH
        for (let userId in usersDatabase) {
            match = usersDatabase[userId]['userName'] == userName;
            if (match) {
                resolve({ message: 'User Exist' }); 
            }
        }
        reject({ message: 'User no exist' })
    });
};

/*
const registerUsers = async (userName, password) => {
    try {
        // SI EL USUARIO EXISTE, NO PODEMOS REGISTRARLO NUEVAMENTE
        exist = await userExist(userName);
        return 'userExist'
    } catch (error) {
        // COMO EL USUARIO NO EXISTE, LO PODEMOS REGISTRAR
        console.log(`Como estamos ${error.message}`)
        let hashPassword = await crypto.hashPassword(password);
        console.log('estamos en register async y esta es la pass', hashPassword)

        let userId = uuid.v4();
        garage.createGarage(userId);
        usersDatabase[userId] = {
            userName,
            'password': hashPassword
        }
        return userId
    }

}; */

const registerUsers =  (userName, password) => {
    return new Promise(async(resolve, reject) => {
        let [noExist, exist] = await to(userExist(userName));
        if (exist) {
            return resolve('userExist');
        }
        // SI EL USUARIO NO EXISTE PODEMOS CREAR UNO NUEVO
        let hashPassword = await crypto.hashPassword(password);
        let userId = uuid.v4();
        await garage.createGarage(userId);
        usersDatabase[userId] = {
            userName,
            'password': hashPassword
        }
        return resolve(userId);
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

const checkUsersCredentials = async (userId, password) => {
    let userDB = usersDatabase[userId];
    let [err, resolve] = await to(crypto.comparePassword(password, userDB.password));
    return resolve
};

exports.registerUsers = registerUsers;
exports.checkUsersCredentials = checkUsersCredentials;
exports.registerUserSync = registerUserSync;
exports.consultUserId = consultUserId;
exports.dbConsult = dbConsult;
