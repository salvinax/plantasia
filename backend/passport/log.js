const db = require("../db");
const passportLog = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

passportLog.use('login', new LocalStrategy({ usernameField: 'username', passwordField: "password" }, async (username, password, done) => {
    try {
        const [logQuery] = await db.query('SELECT * from users WHERE username = ? AND userPassword IS NOT NULL', [username])

        // if user does not exist 
        if (logQuery.length == 0) {
            return done(null, false, { message: 'User Not Found' })
        } else {
            const userData = logQuery[0]
            //if user does exist, compare password 
            await bcrypt.compare(password, userData.userPassword, (err, match) => {
                if (err) return done(null, false, { message: 'Error with Password' })
                if (match) {
                    return done(null, userData, { message: 'Logged in Sucessfully' })
                } else {
                    return done(null, false, { message: 'Wrong Password' })
                }
            })
        }

    } catch (err) {
        return done(err)
    }
}))


module.exports = passportLog