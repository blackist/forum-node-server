'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const server = new koa();

server.use(async (ctx, next) => {
    ctx.body = 'Helle BBS Server';
    await next();
});

server.on('error', function(error) {
    console.log('Error', error);
});

server.use(bodyParser());

server.use(controller());

server.listen(3001);
console.log("Server is running at 3001...");