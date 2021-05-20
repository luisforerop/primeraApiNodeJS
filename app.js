// INICIALIZACIÓN
const express = require('express'); // Creamos el objeto express
const app = express(); // Inicializamos un app con el constructor de express
const port = 3000 // Definimos el puerto para todas nuestras operaciones
// LIBRERÍAS Y MÓDULOS EXPRESS/TERCEROS
const debug = require('debug')('app:debug');
// const bodyParser = require('body-parser'); // Importante para poder recibir correctamente req.body. Usamos el middleware de express


// MÓDULOS PARA USAR
const userController = require('./controllers/users.controller'); // Importamos nuestro módilo de controlador de usuario
const authRoutes = require('./routers/auth').router;
const garageRoutes = require('./routers/garage').router;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parsear info en formato x-www-form-urlencoded: middleware urlencoded
app.use('/auth', authRoutes); // A todas las rutas de authRoutes se le antepondrá un /auth
app.use('/garage', garageRoutes);



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

// Activamos la app llamando la función listen pasando el puerto y un call back
app.listen(port, () => {
    console.log('server starter at port 3000')
});

// Exportamos el objeto para poder usarlo en cualquier módulo externo.
exports.app = app;