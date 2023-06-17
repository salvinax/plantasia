const passport = require('passport');
const register = require('../passport/reg.js');
const login = require('../passport/log.js');
const jwtFunction = require('../passport/jwt.js');
const express = require('express');
const router = express.Router();
const db = require("../db");

require('dotenv').config()
router.post('/register', async (req, res, next) => {

    register.authenticate('register', async (err, user, msg) => {
        if (err) {
            res.status(400).json(err);
        } else {
            try {
                if (user) {
                    const query1 = 'SELECT * from users WHERE username=?'
                    const [search] = await db.query(query1, [req.body.username])
                    //assign jwt token and print in console
                    const userinfo = search[0]
                    const jwt = jwtFunction(userinfo);
                    const tokenInfo = { username: userinfo.username, token: jwt.token, expiresIn: jwt.expires };
                    res.status(200).json(tokenInfo);
                } else {
                    res.status(400).json(msg)
                }
            } catch (error) {
                //notify user there's error
                res.status(500).json(msg);
            }

        }
    })(req, res, next);

})



// login
router.post('/login', (req, res, next) => {

    login.authenticate('login', function (err, user, msg) {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            try {
                if (user) {
                    const jwt = jwtFunction(user);
                    const tokenInfo = { username: user.username, token: jwt.token, expiresIn: jwt.expires, msg };
                    res.status(200).json(tokenInfo);
                } else {
                    res.status(400).json(msg);
                }

            } catch (error) {
                res.status(400).json(error);

            }
        }
    })(req, res, next);

})




module.exports = router;

