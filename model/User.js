var Sequelize = require('sequelize');
var sequelize = require('../db');

let User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING}
}, {
    freezeTableName: true,
    timestamps: false
});

let user = User.sync({force: false});

exports.findByUsernameAndPassword = function(username, password) {
    return User.findOne({
        where: {
            username: username,
            password: password
        }
    });
}

