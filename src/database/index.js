const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Student = require('../app/models/student');

const connection = new Sequelize(dbConfig);

Student.init(connection);

module.exports = connection;