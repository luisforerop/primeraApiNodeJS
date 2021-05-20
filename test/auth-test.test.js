const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;

describe('Suite de pruebas auth', () => {
	// 403: el servidor entiende la petición pero el usuario no tiene autorización 
	/*it('should return 403'), (done) => {

	};*/

	// 401: el usuario no está registrado
	// Generamos este error cuando el usuario no tiene la llamada puesta

	testCredential = { user: 'luis_forerop', password: 'hola mundo 123' }
	testFakeCredential = { user: 'luis_forerop', password: 'hola mundo 321 no es la clave' }

	it('should return 400 when no data is provided', (done) => {
		chai.request(app)
			.post('/auth/login')
			.end((err, res) => {

				console.log(`Este es res: ${res}`);
				chai.assert.equal(res.statusCode, 400);
				done();
			});
	})

	
	it('should return 400 when no user or password is provided', (done) => {
		console.log('hacemos la petición a login enviando solo usuario');
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json')
			.send({nombre: 'pepe'})
			.end((err, res) => {
					chai.assert.equal(res.statusCode, 400);
				done();
			});
	})
	
	// TEST PARA SIGN UP
	it('should return 200 when user signup', (done) => {
		chai.request(app)
			.post('/signUp')
			.set('Content-Type', 'application/json')
			.send(testCredential)
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 200);
				done();
            })
    })

	
	// TESTS PARA LOGIN
	// Los test de login van a pasar porque nos registramos con el user y password de prueba

	it('should return 401 when password is wrong', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testFakeCredential) // Enviamos la información del usuario por body
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 401);
				done();
			});
	});	


	it('should return 200 and token for succesful login', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testCredential) // Enviamos la información del usuario por body
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 200);
				done();
			});
	});

	/* Devolvemos 200 cuando el usuario tiene un token
	* Si el token es válido, devolvemos un 200
	* Para implementarlo correctamente debemos combinar diferentes llamadas
	*/

	it('should return 200 when jwt is valid', (done) => {
		chai.request(app)
			// Primero corremos un test para loguear un usuario
			.post('/auth/login')
			.set('content-type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testCredential) // Enviamos la información del usuario por body
			// Tan pronto como terminamos de hacer el login, podemos hacer un request
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 200); // Comparamos si el request es 200	
				// Evaluamos la información que estamos recibiendo
				//console.log('Este es el código ' + res.statusCode);
				//console.log('Este es el token ' + res.body.token);
				// Hacemos nuestra request
				chai.request(app)
					.get('/garage')
					.set('Authorization', `JWT ${res.body.token}`) // Enviamos el token en el header .set('/Authorization', 'JWT token')
					.end((err, res) => {
						chai.assert.equal(res.statusCode, 200); // Si el token es válido, devolvemos 200
						done();
					});
			});
	});


});