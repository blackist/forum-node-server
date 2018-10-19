/**
 * Upload MiddleWare
 */
'use strict'

const fs = require('fs')
const path = require('path')
const dateFormat = require('dateformat')
const uuid = require('uuid-random')

var upload = async (ctx, next) => {
  console.log(ctx.req.file)
  const file = ctx.req.file
  let desDir =
    path.dirname(require.main.filename) +
    '/uploads/' +
    dateFormat(new Date(), 'yyyy-mm-dd') +
    '/'
  // Create date folder
  if (!fs.existsSync(desDir)) {
    fs.mkdirSync(desDir)
  }
  // get file full path
  let desPath = desDir + uuid() + path.extname(file.originalname)
  fs.writeFile(desPath, file.buffer, function(err) {
    if (err) {
      console.log(err)
      ctx.body = format({}, ERROR_CODE.ERROR)
    }
  })

  ctx.body = format({ url: desPath }, ERROR_CODE.OK)

  await next()
}

module.exports = upload
