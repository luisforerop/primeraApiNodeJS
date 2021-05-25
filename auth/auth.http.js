const express = require('express');
const router = express.Router(); // Construimos un router con el constructor de express
// Librerías
const jwt = require('jsonwebtoken'); // Para generar tokens
const Joi = require('joi'); // Validación de datos
const debug = require('debug')('auth:debug'); // Impresión de mensajes en modo debug
// Módulos
const userController = require('../auth/users.controller');


// VALIDACIONES CON JOI = SCHEMA
const schema = Joi.object({
    user: Joi.string()
        //.alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9 .,@$!%*#?&+-]{8,30}$'))
    // (?=.*\d) al menos un digito (?=.*\w) al menos una letra o _
    // \d = [0-9] \w = [a-zA-Z_]
    // Puede contener letras, 0-9 y _, ademas puede incluir ' '.,@$!%*#?&+- y debe tener entre 8-30

});


// Definimos la ruta como una entidad
router.route('/login')
    .post((req, res) => {
        // IMPLEMENTAR LA VALIDACIÓN CON JOI Y SCHEMA
        // Variables a validar
        toValidate = { user: req.body.user, password: req.body.password };
        // Validación
        const { value, error } = schema.validate(toValidate); // Los valores que necesitamos quedan en el objeto value
        let user = value.user;
        let password = value.password;
        debug(user, password);
        debug(`Estas son user: ${user}, password: ${password} y este es error ${error}`);

        // Si hay un error en la validación
        if (error) {
            debug(error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

        debug('Pasamos el if error')

        // Si son validas generamos un jwt y lo devolvemos
        userController.checkUsersCredentials(user, password, (err, result, done) => {
            debug(`El error es ${err}`);
            debug(`El resultado es ${result}`);
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid credentials' });
            } else {
                // Las credenciales con válidas porque hay un usuario que existe y la contraseña hizo match
                // Creamos un token  
                const token = jwt.sign({ user: user }, 'NuestraClaveSecreta');
                return res.status(200).json({
                    token: token
                })
            }
        });

    });

router.route('/signUp')
    .get((req, res) => {
        return res.status(200).send('hola')
    })
    .post((req, res) => {
        // Validamos si tenemos un nuevo usuario entrante
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'missing data, without data' }); // Debemos agregar el .json o de lo contrario parece que la respuesta es incompleta
        } else if (!req.body.user || !req.body.password) {
            return res.status(400).json({ message: 'no user or password providen' });
        }

        // VARIABLES DE TRABAJO
        username = req.body.user;
        password = req.body.password;
        debug(username, password);

        // CREAMOS EL USUARIO
        userIdTest = userController.registerUserSync(username, password);
        if (userIdTest == 'userExist') {
            return res.status(409).json({
                message: 'The username already exist'
            })
        } else {
            return res.status(200).json({
                message: 'succesful signUp'
            })
        }
    });

exports.router = router;