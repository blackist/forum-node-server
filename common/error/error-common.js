'use strict'

const util = require('util')
const ERROR_MSG = require('./error-msg')
const ERROR_CODE = require('./error-code')

function CustomError(code, msg) {
  Error.call(this, '')

  this.code = code
  this.msg = msg || ERROR_MSG[code] || 'Unknown Error'

  this.getCodeMsg = function() {
    return {
      code: this.code,
      msg: this.msg
    }
  }
}

util.inherits(CustomError, Error)

function HttpError(code, msg) {
  if (Object.values(ERROR_CODE.HTTP).indexOf(code) < 0) {
    throw Error('Invalid Http Code')
  }

  CustomError.call(this, code, msg)
}

util.inherits(HttpError, CustomError)

module.exports = {
  HttpError,
  CustomError
}
