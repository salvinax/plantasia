const passportReg = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../db");
const bcrypt = require('bcrypt');

//HOW TO USE BCRYPT: https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

passportReg.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                let sql2 = 'SELECT * FROM users WHERE username = ?';
                const [sqlQuery] = await db.query(sql2, [username]);

                //username doesn't exist - make account
                if (sqlQuery.length == 0) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, async (err, hash) => {
                            if (err) {
                                return done(null, false, { message: 'Invalid Password' });
                            } else {
                                const sql1 = 'INSERT INTO users VALUES (?,?, ?,?)'
                                const [user] = await db.query(sql1, [username, req.body.firstName, req.body.lastName, hash])
                                return done(null, user);
                            }
                        })
                    })

                } else {
                    //already an account with that username - either guest or customer with account
                    if (sqlQuery[0].userPassword) {
                        //if password in database then user already has account
                        return done(null, false, { message: 'User Already Exists' })
                    } else {
                        //make a password and insert it in database
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, async (err, hash) => {
                                if (err) {
                                    return done(null, false, { message: 'Invalid Password' });
                                } else {
                                    const sql1 = 'UPDATE users SET userPassword = ? WHERE username = ? '
                                    const [user] = await db.query(sql1, [hash, username])
                                    return done(null, user);
                                }
                            })
                        })

                    }

                }

            } catch (err) {
                //error executing query
                return done(err)

            }
        }
    )
);

module.exports = passportReg