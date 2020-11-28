module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: Sequelize.STRING
        },
        Price: {
            type: Sequelize.FLOAT
        }
    });
    return Expense;
};