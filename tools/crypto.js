const bcrypt = require('bcrypt');
const saltRounds = 10; // Cantidad de iteraciones en el proceso de encriptado.

// Funci�n as�ncrona recomendada por bcrypt para encriptaci�n de claves 
const hashPassword = (plainTextPwd) => {
    return bcrypt.hash(plainTextPwd, saltRounds)
};

//FUNCI�N DE COMPARACI�N
const comparePassword = (plainPassword, hashPassword) => {
    return bcrypt.compare(plainPassword, hashPassword)
};

//FUNCI�N S�NCRONA DE HASHEO DE CONTRASE�AS 
const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, saltRounds)
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;
