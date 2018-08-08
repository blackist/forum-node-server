'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const server = new koa();

server.on('error', function(error) {
    console.log('Error', error);
});

server.use(bodyParser());

// log request.
server.use(async (ctx, next) => {
    // console.log(ctx);
    await next();
});

server.use(controller());

const port = 3008;
server.listen(port);
console.log("Server is running at " + port);