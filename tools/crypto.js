const bcrypt = require('bcrypt');
const saltRounds = 10; // Cantidad de iteraciones en el proceso de encriptado.

// Función asíncrona recomendada por bcrypt para encriptación de claves 
const hashPassword = (plainTextPwd) => {
    return bcrypt.hash(plainTextPwd, saltRounds)
};

//FUNCIÓN DE COMPARACIÓN
const comparePassword = (plainPassword, hashPassword) => {
    return bcrypt.compare(plainPassword, hashPassword)
};

//FUNCIÓN SÍNCRONA DE HASHEO DE CONTRASEÑAS 
const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, saltRounds)
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;
