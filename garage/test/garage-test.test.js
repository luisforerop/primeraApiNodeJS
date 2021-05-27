const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../../app').app;

describe('Suite de pruebas para garage', () => {

	let testCredential = { user: 'luis_forerop', password: 'hola mundo 123' }
	let newUserCars = { user: 'luis_forerop', cars: ['Audi', 'Lamborghini', 'tesla'] }
	let userCarDelete = { user: 'luis_forerop', car: 'Audi R8'}
	let resCarsUser = ['Audi R8', 'Lamborghini huracán'];

	it('request to team should return 401 when no jwt token available', (done) => {
		chai.request(app)
			.get('/garage')
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 401);
				done();
			});
	});

	//Test con toda
	it('should return 200 when add new car', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testCredential) // Enviamos la información del usuario por body
			.end((err, res) => {
				tokenLogin = res.body.token
				newUserCars['userId'] = res.body.userId;
				chai.request(app)
					.post('/garage')
					.set('Authorization', `JWT ${tokenLogin	}`, 'Content-Type', 'application/json')
					.send(newUserCars)
					.end((err, res) => {
						// console.log('este es el body desde el test add car', res.body)
						chai.assert.equal(res.statusCode, 200);
						done();
					});
			});
	});


	it('should return of the given user', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') 
			.send(testCredential) 
			.end((err, res) => {
				chai.request(app)
					.get('/garage')
					.set('Authorization', `JWT ${res.body.token}`, 'Content-Type', 'application/json')
					.send(res.body)
					.end((err, res) => {
						//console.log('este es el body desde el test given user', res.body)
						// Tiene garaje con dos superdeportivos, un audi R8 y un Lamborghini Huracán
						chai.assert.equal(res.statusCode, 200);
						chai.assert.equal(res.body.user, testCredential.user);
						//console.log('este es el res body', res.body.garage)
						chai.assert.equal(res.body.garage.length, newUserCars.cars.length);
						// chai.assert.equal(res.body.garage[0].name, resCarsUser[0]);
						// chai.assert.equal(res.body.garage[1].name, resCarsUser[1]);
						done();
					});
			});
	});

	it('should return 200 and name car when data car is delete', (done) => {
		chai.request(app)
			.post('/auth/login')
			.set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
			.send(testCredential) // Enviamos la información del usuario por body
			.end((err, res) => {
				// console.log('este es el body desde return 200 delete:', res.body)
				tokenLogin = res.body.token
				userCarDelete['userId'] = res.body.userId;
				chai.request(app)
					.delete('/garage')
					.set('Authorization', `JWT ${tokenLogin}`, 'Content-Type', 'application/json')
					.send(userCarDelete)
					.end((err, res) => {
						chai.assert.equal(res.statusCode, 200);
						console.log('este es res body:', res.body );
						chai.assert.equal(res.body.user, userCarDelete.user);
						console
						chai.assert.equal(res.body.car, userCarDelete.car);
						done();
					});
			});
	});

});