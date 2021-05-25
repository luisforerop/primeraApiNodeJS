const bcrypt = require('bcrypt');
const saltRounds = 10; // Cantidad de iteraciones en el proceso de encriptado.

// Función asíncrona recomendada por bcrypt para encriptación de claves 
// El callback done será llamado tan pronto como la contraseña sea hasheada
const hashPassword = (plainTextPwd, done) => {
    /* El done, que es un callback, es la función que vamos a usar para almacenar la clave en una base de datos.
    Cómo esta es una función asíncrona, done se va a ejecutar luego de que la contraseña sea hasheada y no antes (por la asincronía) */

    // Función que hashea el password:
    bcrypt.hash(plainTextPwd, saltRounds, done/*(err, hash) => {
        // Llamamos a done, que será la función que almacena la contraseña
        done(err, hash);

        // Dentro de la implementación de bcrypt, el tercer parámetro que recibe el método hash
        // es un callback al que se le pasan los parámetros de err y hash para que haga algo con ellos. 
        // En el ejemplo estábamos creando una función flecha que recibe los parámetros (err, hash) y llama a la función
        // callback done y, a su vez, le pasa los mismos parámetros => done(err, hash); así que
        // como la firma de done es la misma (err, hash), podríamos reemplazar la arrow function por la variable done, que contiene
        // una función. Esta función viene definida como parámetro desde la llamada de hashPassword(contraseña, función).

        // Lo que logramos con esto es 'almacenar' la función que viene como parámetro en la variable done, que al pasarla como
        // parámetro del método hash se comportará como una función.
    }*/);
};


//FUNCIÓN DE COMPARACIÓN
const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done)
};


//FUNCIÓN SÍNCRONA DE HASHEO DE CONTRASEÑAS 
const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, saltRounds)
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;
/*
 * Prueba de funcionamiento:
 * Cuando llamamos la función hashPassword, esta ejecutará la función que se pase como parámetro. Para nuestro ejemplo,
 * la función es un console.log()
 */

//hashPassword('hola mundo', (err, hash) => console.log(`Estamos fiera ${hash}`));

/*
anyPassportTest = 'hola mundo';
userPassportTest = 'hola mundo';

const testFunction = (anyPassportTest, userPassportTest, testNumber) => {
    hashPassword(userPassportTest, (err, hash) => {
        comparePassword(anyPassportTest, hash, (err, result) => {
            console.log(`Este es el test número ${testNumber}`);
            result ? console.log('Aprobado') : console.log('pailiviris')
        });
    });
}

testFunction(anyPassportTest, userPassportTest, 1);
testFunction(anyPassportTest, userPassportTest + ' ', 2);
*/