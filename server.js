'use strict'

const koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')()

const server = new koa()

global.format || (global.format = require('./common/util/response').format)
global.ERROR_CODE || (global.ERROR_CODE = require('./common/error/error-code'))
global.HttpError ||
  (global.HttpError = require('./common/error/error-common').HttpError)
global.CustomError ||
  (global.CustomError = require('./common/error/error-common').CustomError)

// Cors
server.use(
  cors({
    origin: function(ctx) {
      return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)

// bodyParser
server.use(
  bodyParser({
    multipart: true
  })
)

// log request.
// server.use(async (ctx, next) => {
//   console.log(ctx.request)
//   await next()
// })

/**
 * Exception catch.
 */
server.use((ctx, next) => {
  return next().catch(err => {
    let code = 500
    let msg = 'Unknown Error'

    if (err instanceof CustomError || err instanceof HttpError) {
      const res = err.getCodeMsg()
      ctx.status = err instanceof HttpError ? res.code : 200
      code = res.code
      msg = res.msg
    } else {
      ctx.status = code
      console.error('CATCH_ERROR', err)
    }

    ctx.body = format({}, code, msg)
  })
})

/**
 * route.
 */
server.use(controller.routes())

server.on('error', function(error) {
  console.log('Error', error)
})

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

const port = 3008
server.listen(port)
server.on('listening', () => {
  console.log('Listening on port: %d', port)
})
