const uuid = require('uuid'); // Librer�a para generar identificadores �nicos
const crypto = require('../crypto.js'); // Importamos nuestra funci�n de crypto
const garage = require('../controllers/garage.controller')

// BASES DE DATOS EF�MERAS:
const usersDatabase = {};

/*
 La estructura de nuestra base de datos ef�mera es:
 {
    identificador: {
        'password': contrase�aEncriptada,
        'salt' : componenteNecesarioParaCriptografiaDeContrase�as,
        'userName' : nombreDelUsuario
    }
 }
 */

// Users id-> contrase�as cifradas para validar las credenciales.

const dbConsult = () => usersDatabase;

const consultUserId = (userName) => {
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
    // Generamos un id �nico usando uuid.v4
    // Mi implementaci�n
    crypto.hashPassword(password, (err, hashPassword) => {
        let userId = uuid.v4();
        garage.createGarage(userName);
        usersDatabase[userId] = {
            'userName': userName,
            // Usando el script de crypto almacenamos la constrase�a hasheada
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
        userId = uuid.v4();
        garage.createGarage(userId); // Creamos un garage sin contenido
        usersDatabase[userId] = {
            'userName': userName,
            'password': crypto.hashPasswordSync(password)
        }
        return  userId
    }

}

const checkUsersCredentials = (user, password, done /*funci�n callback que viene de la petici�n*/) => {
    let userId = consultUserId(user);
    let userDB = usersDatabase[userId];
    crypto.comparePassword(password, userDB.password, done); // Done es una funci�n callback que enviamos al crypto y equivale al done de los par�metros
};




exports.registerUsers = registerUsers;
exports.checkUsersCredentials = checkUsersCredentials;
exports.registerUserSync = registerUserSync;
exports.consultUserId = consultUserId;
exports.dbConsult = dbConsult;
exports.userExist = userExist;

// TESTS
// registerUsers('luis_forerop', 'hola mundo', () => console.log(usersDatabase))
/*
registerUserSync('luis_forerop', 'hola mundo');
registerUserSync('fede', 'dfsdf');
registerUserSync('fede', 'dfsdf');
registerUserSync('fede2', 'dfsdf');
registerUserSync('fede2', 'dfsdf');
registerUserSync('fede3', 'dfsdf');
registerUserSync('fede3', 'dfsdf');
registerUserSync('fede', 'dfsdf');
console.log(usersDatabase);
//console.log(consultUserId('luis_forerop'));
*/