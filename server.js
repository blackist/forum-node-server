'use strict';

const koa = require('koa');

const server = new koa();

server.use(async (ctx, next) => {
    ctx.body = 'Helle BBS Server';
    await next();
});

server.listen(3001);
console.log("Server is running at 3001...");