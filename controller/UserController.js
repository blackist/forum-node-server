'use strict';

var format = require('../util/response').format;
const ERROR_CODE = require('../util/error-code');
const HttpError = require('../util/error-common').HttpError;
const CustomError = require('../util/error-common').CustomError;
var User = require('../model/User');

var user_login = async (ctx, next) => {

    var 
    username = ctx.request.body.username || '',
    password = ctx.request.body.password || '';

    var user = await User.findByUsernameAndPassword(username, password);

    if(user !== null && user.username !== undefined) {
        ctx.response.body = user;
    } else{
        ctx.body = { 
            msg : "User or Password Error"
        };
        ctx.status = 404;
    }
    await next();
}

var user_register = async (ctx, next) => {

    console.log(ctx.request.body);

    var 
    tel = ctx.request.body.tel || '',
    username = ctx.request.body.username || '',
    password = ctx.request.body.password || '',
    passfirm = ctx.request.body.passfirm || '',
    email = ctx.request.body.email || '';


    if (!username && !tel && !email) {
        throw new CustomError(ERROR_CODE.CUSTOM.PARAM_NULL);
    } else {

        let result = await User.upsert({
            tel: tel,
            username: username, 
            password: password, 
            email: email,
            email_check: false,
            is_admin: false,
            state: 'A',
            state_time: Date.now(),
            create_time: Date.now()
        }, {
            username: username
        });

        console.log(result);

        ctx.body = format(ERROR_CODE.OK);
    }

    await next();
}

module.exports = {
    'POST /user/login': user_login,
    'POST /user/register': user_register
};