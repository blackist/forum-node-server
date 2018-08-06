'use strict';


var user_login = async (ctx, next) => {
    var 
    username = ctx.request.body.username || '',
    password = ctx.request.body.password || '';
    ctx.response.body = "Login Success!";
}

var user_register = async (ctx, next) => {

}

module.exports = {
    'GET /login': user_login,
    'POST /register': user_register
};