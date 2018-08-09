'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const CustomError = require('./util/error-common').CustomError;
const HttpError = require('./util/error-common').HttpError;
const format = require('./util/response').format;

const server = new koa();

/**
 * Middle Ware.
 */
server.use(bodyParser());

/**
 * log request.
 */
// server.use(async (ctx, next) => {
//     // console.log(ctx);
//     await next();
// });

/**
 * 全局异常捕获.
 */
server.use((ctx, next) => {
    return next().catch((err) => {
        let code = 500;
        let msg = 'Unknown Error';
        
        if(err instanceof CustomError || err instanceof HttpError) {
            const res = err.getCodeMsg();
            ctx.status = err instanceof HttpError ? res.code : 200;
            code = res.code;
            msg = res.msg;
        } else {
            ctx.status = code;
            console.error('CATCH_ERROR', err);
        }

        ctx.body = format(code, msg, {});
    });
});

/**
 * route.
 */
server.use(controller());

server.on('ON_ERROR', function(error) {
    console.log('Error', error);
});

// server.on('ON_ERROR', (error) => {
//     if (error.syscall !== 'listen') {
//       throw error
//     }
//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//       case 'EACCES':
//         console.error(port + ' requires elevated privileges')
//         process.exit(1)
//       case 'EADDRINUSE':
//         console.error(port + ' is already in use')
//         process.exit(1)
//       default:
//         throw error
//     }
// });

const port = 3008;
server.listen(port);
server.on('listening', () => {
    console.log('Listening on port: %d', port)
});