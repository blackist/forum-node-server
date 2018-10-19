/**
 * Upload MiddleWare
 */
'use strict'

const fs = require('fs')
const path = require('path')
const dateFormat = require('dateformat')
const uuid = require('uuid-random')

/**
 * handle single file
 * @param {} ctx
 * @param {*} next
 */
var upload = async (ctx, next) => {
  // ctx.req.files contains files uploaded
  // ctx.req.body contains fields property
  console.log(ctx.req.files)
  console.log(ctx.req.body)
  if (!ctx.req.files || ctx.req.files.length == 0) {
    ctx.body = format({}, ERROR_CODE.FILE_NULL)
    await next()
    return
  }
  // single file
  if (ctx.req.files.length == 1) {
    let file = ctx.req.files[0]
    let res = await saveFile(file)
    if (res) {
      ctx.body = format(res, ERROR_CODE.OK)
    } else {
      ctx.body = format({}, ERROR_CODE.FILE_WRITE_ERROR)
    }
    await next()
    return
  }

  // multi files
  let datas = []
  for (let i = 0; i < ctx.req.files.length; i++) {
    let file = ctx.req.files[i]
    let res = await saveFile(file)
    if (res) {
      datas.push(res)
    }
  }
  ctx.body = format({ datas }, ERROR_CODE.OK)
  await next()
}

var saveFile = async file => {
  let rootDir = path.dirname(require.main.filename)
  let subDir = '/uploads/' + dateFormat(new Date(), 'yyyy-mm-dd') + '/'
  // Create date folder
  if (!fs.existsSync(rootDir + subDir)) {
    fs.mkdirSync(rootDir + subDir)
  }
  // get file full path
  let fileUrl = subDir + uuid() + path.extname(file.originalname)
  let desPath = rootDir + fileUrl

  return new Promise(function(resolve, reject) {
    fs.writeFile(desPath, file.buffer, err => {
      if (err) resolve(null)
      else resolve({ url: fileUrl, name: file.originalname })
    })
  })
}

module.exports = {
  // Single file upload
  'UPLOAD /files/upload': upload
}
