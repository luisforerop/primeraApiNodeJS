// Iniciamos la función assert de chai
const assert = require('chai').assert;

//Función para probar el funcionamiento de nuestro test unitario
const callFunction = (a, b) => a + b;


// Definimos una suite que contiene test dentro
// Es como una agrupación del conjunto de tests
describe('Suite de prueba para el curso', () => {
    //It describe un caso de test. descripción, función
    it('should return 2', () => {
        // Llamamos una función de nuestro backend
        let va = callFunction(1, 1);
        // Con assert.equal nos aseguramos, por ejemplo, de que la función devuelva 2
        assert.equal(va, 2);
    });
});
