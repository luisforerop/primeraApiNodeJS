const bcrypt = require('bcrypt');
const saltRounds = 10; // Cantidad de iteraciones en el proceso de encriptado.

// Funci�n as�ncrona recomendada por bcrypt para encriptaci�n de claves 
// El callback done ser� llamado tan pronto como la contrase�a sea hasheada
const hashPassword = (plainTextPwd, done) => {
    /* El done, que es un callback, es la funci�n que vamos a usar para almacenar la clave en una base de datos.
    C�mo esta es una funci�n as�ncrona, done se va a ejecutar luego de que la contrase�a sea hasheada y no antes (por la asincron�a) */

    // Funci�n que hashea el password:
    bcrypt.hash(plainTextPwd, saltRounds, done/*(err, hash) => {
        // Llamamos a done, que ser� la funci�n que almacena la contrase�a
        done(err, hash);

        // Dentro de la implementaci�n de bcrypt, el tercer par�metro que recibe el m�todo hash
        // es un callback al que se le pasan los par�metros de err y hash para que haga algo con ellos. 
        // En el ejemplo est�bamos creando una funci�n flecha que recibe los par�metros (err, hash) y llama a la funci�n
        // callback done y, a su vez, le pasa los mismos par�metros => done(err, hash); as� que
        // como la firma de done es la misma (err, hash), podr�amos reemplazar la arrow function por la variable done, que contiene
        // una funci�n. Esta funci�n viene definida como par�metro desde la llamada de hashPassword(contrase�a, funci�n).

        // Lo que logramos con esto es 'almacenar' la funci�n que viene como par�metro en la variable done, que al pasarla como
        // par�metro del m�todo hash se comportar� como una funci�n.
    }*/);
};


//FUNCI�N DE COMPARACI�N
const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done)
};


//FUNCI�N S�NCRONA DE HASHEO DE CONTRASE�AS 
const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, saltRounds)
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;
/*
 * Prueba de funcionamiento:
 * Cuando llamamos la funci�n hashPassword, esta ejecutar� la funci�n que se pase como par�metro. Para nuestro ejemplo,
 * la funci�n es un console.log()
 */

//hashPassword('hola mundo', (err, hash) => console.log(`Estamos fiera ${hash}`));

/*
anyPassportTest = 'hola mundo';
userPassportTest = 'hola mundo';

const testFunction = (anyPassportTest, userPassportTest, testNumber) => {
    hashPassword(userPassportTest, (err, hash) => {
        comparePassword(anyPassportTest, hash, (err, result) => {
            console.log(`Este es el test n�mero ${testNumber}`);
            result ? console.log('Aprobado') : console.log('pailiviris')
        });
    });
}

testFunction(anyPassportTest, userPassportTest, 1);
testFunction(anyPassportTest, userPassportTest + ' ', 2);
*/