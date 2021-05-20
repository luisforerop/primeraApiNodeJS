const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;

describe('Suite de pruebas para garage', () => {

	let testCredential = { user: 'luis_forerop', password: 'hola mundo 123' }
	let newUserCars = { user: 'luis_forerop', cars: ['Audi R8', 'Lamborghini Huracán'] }

	it('request to team should return 401 when no jwt token available', (done) => {
		chai.request(app)
			.get('/garage')
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 401);
				done();
			});
	});
	/*
	it('should return 200 when new car add', (done) => {
		chai.request(app)
			.post('/garage')
			.set('Content-Type', 'application/json')
			.send(newUserCars)
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 200);
				done();
			});

	});*/

	//Test con toda
	it('should return 200 when add new car', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testCredential) // Enviamos la información del usuario por body
			.end((err, res) => {
				chai.request(app)
					.post('/garage')
					.set('Authorization', `JWT ${res.body.token}`, 'Content-Type', 'application/json')
					.send(newUserCars)
					.end((err, res) => {
						console.log('este es el body desde el test add car', res.body)
						// Tiene garaje con dos superdeportivos, un audi R8 y un Lamborghini Huracán
						chai.assert.equal(res.statusCode, 200);
						done();
					});

			});

	});


	it('should return of the given user', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testCredential) // Enviamos la información del usuario por body
			.end((err, res) => {
				chai.request(app)
					.get('/garage')
					.set('Authorization', `JWT ${res.body.token}`, 'Content-Type', 'application/json')
					.send({saludo: 'hola'})
					.end((err, res) => {
						console.log('este es el body desde el test given user', res.body)
						// Tiene garaje con dos superdeportivos, un audi R8 y un Lamborghini Huracán
						chai.assert.equal(res.statusCode, 200);
						chai.assert.equal(res.body.user, testCredential.user);
						chai.assert.equal(res.body.garage.length, 2);
						chai.assert.equal(res.body.garage[0], newUserCars.cars[0]);
						chai.assert.equal(res.body.garage[1], newUserCars.cars[1]);
						done();
					});

			});

	});


});