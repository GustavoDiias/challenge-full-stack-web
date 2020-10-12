const { Model, DataTypes } = require('sequelize');

class Student extends Model {

    static init(sequelize) {
        super.init({
            ra: DataTypes.INTEGER,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            cpf: DataTypes.BIGINT,
        }, {
            sequelize
        })
    }
}

module.exports = Student;