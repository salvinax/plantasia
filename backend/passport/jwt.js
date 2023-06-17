const jwt = require('jsonwebtoken');
const fs = require('fs');

const PRIV_KEY = fs.readFileSync('./generateKeys/id_rsa_priv.pem', "utf8")

function createToken(user) {
    const _id = user.username;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const options = { expiresIn: expiresIn, algorithm: 'RS256' }

    const newToken = jwt.sign(payload, PRIV_KEY, options);

    return {
        token: newToken,
        expires: expiresIn
    };
}
module.exports = createToken;