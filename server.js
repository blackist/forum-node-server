'use strict';

const koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const CustomError = require('./common/error/error-common').CustomError;
const HttpError = require('./common/error/error-common').HttpError;
const format = require('./common/util/response').format;

const server = new koa();

/**
 * Middle Ware.
 */
// 跨域
server.use(cors({
    origin: function (ctx) {
        // 允许来自所有域名请求
        return "*"; 
        // 这样就能只允许 http://localhost:8080 这个域名的请求了
        // return 'http://localhost:8080'; 
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// 参数解析
// server.use(bodyParser({
//    formidable:{uploadDir: './uploads'},
//    multipart: true,
//    urlencoded: true
// }));
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

        ctx.body = format({}, code, msg);
    });
});

/**
 * route.
 */
server.use(controller());

server.on('error', function(error) {
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