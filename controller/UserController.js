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

    console.log(ctx.request.body);

    var 
    tel = ctx.request.body.tel || '',
    username = ctx.request.body.username || '',
    password = ctx.request.body.password || '',
    passfirm = ctx.request.body.passfirm || '',
    email = ctx.request.body.email || '';


    if (!username) {
        ctx.status = 422;
        ctx.body = { 
            msg : "Username is Null"
        };
    } else if (!username) {
        ctx.status = 422;
        ctx.body = { 
            msg : "Password is Null"
        };
    } else if(!tel) {
        ctx.status = 422;
        ctx.body = { 
            msg : "Tel is Null"
        };
    } else {

        await User.upsert({
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

        ctx.status = 200;
        ctx.body = { 
            msg : "Register Successfully"
        };
    }

    await next();
}

module.exports = {
    'POST /user/login': user_login,
    'POST /user/register': user_register
};