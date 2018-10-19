'use strict'

module.exports = Object.freeze({
  OK: 0,
  ERROR: 1,

  FILE_NULL: 10,
  FILE_ERROR: 11,
  FILE_READ_ERROR: 12,
  FILE_WRITE_ERROR: 13,

  HTTP: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_BUSY: 503
  },

  CUSTOM: {
    PARAM_NULL: 1001,
    PARAM_ERROR: 1002,

    NOT_FOUND: 1011
  }
})