// AUTENTIFICACIÓN
// La siguiente función configura y 'activa' passport

    // Definimos estrategia de autentificación
const JwtStrategy = require('passport-jwt').Strategy,
    // Creamos una variable que contiene el objeto que se encargará de extraer el jwt
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Creamos un módulo para exportar una función para usar passport
// Como vamos a usar esta función en otro módulo, hacemos que requiera un objeto passport como parámetro para funcionar
module.exports = passport => {
    // Definimos las opciones de passport para extraer el token del request
    const opts = {};
    // Agregamos la opción para extraer el jwt del header con passport usando el método fromAuthHeaderWithScheme
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    // Creamos el secret or key que es una string que contiene la información para verificar la firma del token
    // En este caso usamos el tipo secret, que es simétrico
    opts.secretOrKey = 'NuestraClaveSecreta'; // Esto debería estar en una variable de entorno ya que es nuestra clave
    /*
     * Instanciamos la estrategia jwt usando el método de passport "use" (que al parecer es de express). 
     * Esta recibe las opciones de configuración y una función a ejecutar
     * La función que recibe JwtStrategy es una función de resultado que se usa para hacer una comprobación.
     * Decoded o payload sería el Jwt decodificado
     */
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded);
    }));




}
