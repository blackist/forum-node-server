'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const server = new koa();

server.on('error', function(error) {
    console.log('Error', error);
});

server.use(bodyParser());

server.use(controller());

server.listen(3001);
console.log("Server is running at 3001...");