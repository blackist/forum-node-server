'use strict';

var format = require('../common/util/response').format;
const ERROR_CODE = require('../common/error/error-common');
const HttpError = require('../common/error/error-common').HttpError;
const CustomError = require('../common/error/error-common').CustomError;
var User = require('../model/User');

var user_login = async (ctx, next) => {

    var 
    username = ctx.request.body.username || '',
    password = ctx.request.body.password || '';

    var user = await User.queryByUsernameAndPassword(username, password);

    if(user !== null && user.username !== undefined) {
        ctx.body = format(user, ERROR_CODE.OK);
    } else{
        ctx.body = format({}, ERROR_CODE.CUSTOM.NOT_FOUND);
    }
    await next();
}

var user_query = async (ctx, next) => {
    let user = await User.queryUser({
        id: ctx.params.id
    });

    ctx.body = format(user, ERROR_CODE.OK);

    await next();
}

var user_allIds = async (ctx, next) => {

    let tels = await User.queryAllIds();

    ctx.body = format(tels, ERROR_CODE.OK);

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

        ctx.body = format({}, ERROR_CODE.OK);
    }

    await next();
}

var user_update = async (ctx, next) => {
    await next();
}

var user_delete = async (ctx, next) => {
    await next();
}

module.exports = {
    'GET /userIds': user_allIds,
    'GET /user/:id': user_query,
    'PUT /user/:id': user_update,
    'POST /user/login': user_login,
    'POST /user/register': user_register,
    'DELETE /user/:id': user_delete
};