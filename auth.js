// AUTENTIFICACI�N
// La siguiente funci�n configura y 'activa' passport

    // Definimos estrategia de autentificaci�n
const JwtStrategy = require('passport-jwt').Strategy,
    // Creamos una variable que contiene el objeto que se encargar� de extraer el jwt
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Creamos un m�dulo para exportar una funci�n para usar passport
// Como vamos a usar esta funci�n en otro m�dulo, hacemos que requiera un objeto passport como par�metro para funcionar
module.exports = passport => {
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
