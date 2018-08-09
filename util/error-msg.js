'use strict';

module.exports = Object.freeze({
    0: 'OK',
    1: 'Error',

    /**
     * HTTP ERROR.
     */
    400: 'BAD REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT FOUND',
    500: 'INTERNAL SERVER ERROR',
    503: 'SERVICE BUSY',

    /**
     * CUSTOM ERROR.
     */
    1001: 'PARAM NULL',
    1002: 'PARAM ERROR'
});