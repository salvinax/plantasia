const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require("../db");
const fs = require('fs');

//require('./config/passport')(passport); passing passport instance in this function 
const PUB_KEY = fs.readFileSync('./generateKeys/id_rsa_pub.pem', 'utf8');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};
// token middleware - verify token
module.exports = (passport) => {
    passport.use('jwt', new JWTStrategy(options, async (payload, done) => {
        try {
            const idName = payload.sub
            const [result] = await db.query(`SELECT * FROM users WHERE username = ?`, [idName]);
            if (result.length === 0) {
                return done(null, false);
            } else {
                return done(null, result[0]);
            }
        } catch (err) {
            return done(err);
        }
    }));
};



