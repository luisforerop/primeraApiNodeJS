// LIBRERÍAS Y MÓDULOS EXPRESS/TERCEROS
const express = require('express'); // Creamos el objeto express
const app = express(); // Inicializamos un app con el constructor de express
const port = 3000 // Definimos el puerto para todas nuestras operaciones
const passport = require('passport'); // Importamos la librería de passport 
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:debug');
const Joi = require('joi'); // Útil para validación de datos de entrada
// const bodyParser = require('body-parser'); // Importante para poder recibir correctamente req.body. Usamos el middleware de express


// MÓDULOS PARA USAR
const userController = require('./controllers/users'); // Importamos nuestro módilo de controlador de usuario
// Importamos nuestro código de auth js y llamamos a la función passport pasandole el objeto de passport:
// Activamos passport
require('./auth')(passport);

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parsear info en formato x-www-form-urlencoded: middleware urlencoded

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



//Creamos un servicio para get. Necesitamos los parámetros req de petición y res de respuesta
app.get('/', (req, res) => {
    //Usamos el método send para enviar un body
    //res.send('Hello world!');
    //Si queremos devolver un código de estado específico:
    res.status(401).send('mucho texto')
    //Imprimimos la peteción o request
    //console.log(req);
});
 
// Implementamos el login
/* 
 * Comprobamos credenciales: Si no son válidas, error; Si no recibimos información, estatus 400; 
 * Si viene solo pasamos without data
 */

app.post('/login', (req, res) => {
    // Usamos keys().length para comprobar si hay o no información en el json
    // IMPLEMENTAR LA VALIDACIÓN CON JOI Y SCHEMA
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'missing data, without data' }); // Debemos agregar el .json o de lo contrario parece que la respuesta es incompleta
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: 'no user or password providen' });
    }

    // Definimos variables
    user = req.body.user;
    password = req.body.password;
   
    // Si son validas generamos un jwt y lo devolvemos
    userController.checkUsersCredentials(user, password, (err, result, done) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            // Las credenciales con válidas porque hay un usuario que existe y la contraseña hizo match
            // Creamos un token  
            const token = jwt.sign({ userId: req.body.user }, 'NuestraClaveSecreta'); 
            return res.status(200).json({
                token: token
            })
            //return res.status(200).json({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY' });
        }
    });

});

// Implementamos el sign up
app.post('/signUp', (req, res) => {
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

// Pedimos la base de datos
app.get('/dbconsult', (req, res) => res.status(200).send(userController.dbConsult()));




app.post('/team/pokemons', (req, res) => {
    res.status(200).send('mucho texto')
});


app.get('/team',
    // Usamos como middleware para proteger el ingreso a team la función passport
    // Lo que hacemos es 'passport, toma este endpoint y hazme una autentificación usando jwt' y si pasa, server haz lo tuyo
    passport.authenticate('jwt', { session: false }),
    // Definimos nuestra función handler
    (req, res) => {
    res.status(200).send('mucho texto de team')
});


// Para definir parámetros en express usamos los :
app.delete('/team/pokemons/:pekeid', (req, res) => {
    res.status(200).send('mucho texto')
});

app.put('/team', (req, res) => {

    res.status(200).send('mucho texto')
});

// Activamos la app llamando la función listen pasando el puerto y un call back
app.listen(port, () => {
    console.log('server starter at port 3000')
});

// Exportamos el objeto para poder usarlo en cualquier módulo externo.
exports.app = app;