/*
    this file deals with parsing the config file
*/

const env = require('dotenv').config();


const secrectConfig = {
    authPrivatekey: process.env.AUTH_PRIVATE_KEY,
    circleAuthPrivateKey: process.env.CIRCLE_AUTH_PRIVATE_KEY
};

const connectionConfig = {
    // clientMsPort: process.env.CLIENT_MS_PORT,
    env: process.env.ENV
};

module.exports = {
    // dbConfig,
    secrectConfig,
    connectionConfig
};