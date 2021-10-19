'use strict';

const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

const websocketServer = require('./websocket/websocket-server');

const networkRoute = require('./routes/network');
const blockRoute = require('./routes/block');
const addressRoute = require('./routes/address');
const transactionRoute = require('./routes/transactions');

dotenv.config();

const init = async () => {

    const server = Hapi.server({
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST
    });

    server.route(networkRoute);
    server.route(blockRoute);
    server.route(addressRoute);
    server.route(transactionRoute);
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();