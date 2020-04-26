/*
    this file deals with parsing the config file
*/

const env = require('dotenv').config();

const dbConfig = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    connectionString: process.env.MONOGO_CONNECTION_STRING,
    authdb: process.env.MONGO_AUTH_DB,
    dbName: 'home-chat-' + process.env.ENV
};

const secrectConfig = {
    authPrivatekey: process.env.AUTH_PRIVATE_KEY
};

const connectionConfig = {
    clientMsPort: process.env.CLIENT_MS_PORT,
    env: process.env.ENV
};

module.exports = {
    dbConfig,
    secrectConfig,
    connectionConfig
};