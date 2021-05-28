// INICIALIZACIÓN
const express = require('express'); // Creamos el objeto express
const app = express(); // Inicializamos un app con el constructor de express
const port = 3000 // Definimos el puerto para todas nuestras operaciones
require('./database');

const middleware = require('./middleware'); // MIDDLEWARES

// MÓDULOS PARA USAR
const userController = require('./auth/users.controller'); // Importamos nuestro módilo de controlador de usuario
// RUTAS
const authRoutes = require('./auth/auth.router').router;
const garageRoutes = require('./garage/garage.router').router;
// MIDDLEWARE
middleware.setupMiddleware(app); // Llamamos a setupMiddleware y dejamos que se encargue del resto

// ACTIVAMOS RUTAS
app.use('/auth', authRoutes); // A todas las rutas de authRoutes se le antepondrá un /auth
app.use('/garage', garageRoutes);

app.get('/', (req, res) => {
    res.status(401).send('mucho texto')
});
// Pedimos la base de datos
app.get('/dbconsult', (req, res) => res.status(200).send(userController.dbConsult()));

// Activamos la app llamando la función listen pasando el puerto y un call back
app.listen(port, () => {
    console.log('server starter at port 3000')
});
// Exportamos el objeto para poder usarlo en cualquier módulo externo.
exports.app = app;