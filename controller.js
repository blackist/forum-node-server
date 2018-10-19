'use strict'

const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')
const upload = multer({ storage: multer.memoryStorage() })

const API_VERSION_V1 = '/v1'

// get url mapping from controller file
function addRouter(router, dir) {
  var js_files = loopFiles(dir).filter(f => {
    return f.endsWith('Controller.js')
  })

  for (var f of js_files) {
    console.log('Controller: ' + '/' + f)
    let mapping = require(__dirname + '/' + f)
    addMapping(router, mapping)
  }
}

// register url in router
function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET')) {
      var path = API_VERSION_V1 + url.substring(4)
      router.get(path, mapping[url])
      console.log('register GET ' + path)
    } else if (url.startsWith('POST')) {
      var path = API_VERSION_V1 + url.substring(5)
      router.post(path, mapping[url])
      console.log('register POST ' + path)
    } else if (url.startsWith('PUT')) {
      var path = API_VERSION_V1 + url.substring(4)
      router.put(path, mapping[url])
      console.log('register PUT ' + path)
    } else if (url.startsWith('DELETE')) {
      var path = API_VERSION_V1 + url.substring(7)
      router.delete(path, mapping[url])
      console.log('register DELETE ' + path)
    } else if (url.startsWith('UPLOAD')) {
      var path = API_VERSION_V1 + url.substring(7)
      router.post(path, upload.array('files', 9), mapping[url])
      console.log('register POST ' + path)
    }
  }
}

/**
 * Loop files
 * @param rootPath
 * @returns {Array}
 */
function loopFiles(rootPath) {
  let result = []
  function finder(subPath) {
    let files = fs.readdirSync(__dirname + '/' + subPath)
    files.forEach((val, index) => {
      let fPath = path.join(subPath, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push(fPath.replace(/\\/g, '/'))
    })
  }
  finder(rootPath)
  return result
}

module.exports = function(dir) {
  let controller_dir = dir || 'controller',
    router = require('koa-router')()

  addRouter(router, controller_dir)

  return router
}
