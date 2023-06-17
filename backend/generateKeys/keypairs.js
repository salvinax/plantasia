const crypto = require('crypto');
const fs = require('fs');

//from https://www.zachgollwitzer.com/posts/public-key-cryptography

function generateKeys() {

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: "pem"
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
    // Create the public key file
    fs.writeFileSync(__dirname + "/id_rsa_pub.pem", publicKey);

    // Create the private key file
    fs.writeFileSync(__dirname + "/id_rsa_priv.pem", privateKey);
}

generateKeys();

