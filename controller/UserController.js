'use strict';

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

}

module.exports = {
    'POST /login': user_login,
    'POST /register': user_register
};