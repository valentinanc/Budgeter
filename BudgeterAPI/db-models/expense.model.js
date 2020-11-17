module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        Name: {
            type: Sequelize.STRING
        },
        Price: {
            type: Sequelize.INTEGER
        }
    });
    return Expense;
};