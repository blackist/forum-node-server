var Sequelize = require('sequelize');

/**
 * 连接指定类型的数据库
 * host：数据库地址
 * max：连接池最大连接数量
 * min：连接池最小连接数量
 * idle：每个线程最长等待时间
 * @type {Sequelize}
 */
module.exports = new Sequelize('smarthome_forum', 'black', 'Black1614.', {
    host: '120.78.202.215',
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
});