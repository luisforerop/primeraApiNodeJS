const JwtStrategy = require('passport-jwt').Strategy;  // Estrategia de autentificaci�n
const ExtractJwt = require('passport-jwt').ExtractJwt; // Objeto encargado de extraer el jwt
const passport = require('passport');


const init = () => {
    // Definimos las opciones de passport para extraer el token del request
    const opts = {};
    // Agregamos la opci�n para extraer el jwt del header con passport usando el m�todo fromAuthHeaderWithScheme
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    // Creamos el secret or key que es una string que contiene la informaci�n para verificar la firma del token
    // En este caso usamos el tipo secret, que es sim�trico
    opts.secretOrKey = 'NuestraClaveSecreta'; // Esto deber�a estar en una variable de entorno ya que es nuestra clave
    /*
     * Instanciamos la estrategia jwt usando el m�todo de passport "use" (que al parecer es de express). 
     * Esta recibe las opciones de configuraci�n y una funci�n a ejecutar
     * La funci�n que recibe JwtStrategy es una funci�n de resultado que se usa para hacer una comprobaci�n.
     * Decoded o payload ser�a el Jwt decodificado
     */
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded);
    }));
}

// Funci�n para ejecutar el middleware de autentificaci�n en los casos deseados (con excepci�n a ciertas rutas)
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
