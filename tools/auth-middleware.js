const JwtStrategy = require('passport-jwt').Strategy;  // Estrategia de autentificación
const ExtractJwt = require('passport-jwt').ExtractJwt; // Objeto encargado de extraer el jwt
const passport = require('passport');


const init = () => {
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

// Función para ejecutar el middleware de autentificación en los casos deseados (con excepción a ciertas rutas)
const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login' || req.path == '/dbconsult' || req.path == '/auth/signUp' || req.path == '/garage/dbcars') {
        return next();
    }
    else {
        return passport.authenticate('jwt', { session: false })(req, res, next);
    }
}


exports.init = init;
exports.protectWithJwt = protectWithJwt;
