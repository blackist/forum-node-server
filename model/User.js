var Sequelize = require('sequelize');
var sequelize = require('../db');
const ERROR_CODE = require('../util/error-code');
const CustomError = require('../util/error-common').CustomError;

let User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    tel: {type: Sequelize.STRING},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    email_check: {type: Sequelize.BOOLEAN},
    is_admin: {type: Sequelize.BOOLEAN},
    state: {type: Sequelize.CHAR},
    state_time: {type:Sequelize.DATE},
    create_time: {type: Sequelize.DATE}
}, {
    freezeTableName: true,
    timestamps: false
});

let user = User.sync({force: false});

exports.queryByUsernameAndPassword = function(username, password) {
    return User.findOne({
        where: {
            username: username,
            password: password
        }
    });
}

exports.queryUser = function(condition) {
    return User.findAll({
        where: condition
    });
}

exports.queryAllIds = function() {
    return User.findAll({
        where : {
            
        },
        attributes: [
            'username',
            'tel',
            'email'
        ]
    });
}

exports.upsert = function(values, condition) {
    return User
        .findOne({ where: condition })
        .then(function(obj) {
            if(obj) { // update
                return obj.update(values);
            }
            else { // insert
                return User.create(values);
            }
        });
}

