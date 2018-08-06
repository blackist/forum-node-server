'use strict';

var User = require('../model/User');

var user_login = async (ctx, next) => {

    console.log(ctx.request);
    var 
    username = ctx.request.body.username || '',
    password = ctx.request.body.password || '';
    
    console.log(username);

    var user = await User.findByUsernameAndPassword(username, password);

    if(user !== null && user.username !== undefined) {
        ctx.response.body = user;
    } else{
        ctx.response.body = "User Not Exists";
    }

    await next();
}

var user_register = async (ctx, next) => {

}

module.exports = {
    'GET /login': user_login,
    'POST /register': user_register
};