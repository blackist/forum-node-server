'use strict';

module.exports = Object.freeze({

    OK: 0,
    ERROR: 1,

    HTTP : {
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
});