'use strict';

const ERROR_MSG = require('./error-msg');

const format = (code, msg, data) => {

    if(!msg) {
        if (Object.values(ERROR_CODE).indexOf(code) >= 0
            || Object.values(ERROR_CODE.HTTP).indexOf(code) >= 0
            || Object.values(ERROR_CODE.CUSTOM).indexOf(code) >= 0) {
            msg = ERROR_MSG[code];
        }
    }
    return {
        code, msg, data
    };
}

module.exports = {
    format
}