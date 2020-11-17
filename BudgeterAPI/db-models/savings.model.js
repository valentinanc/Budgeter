module.exports = (sequelize, Sequelize) => {
    const Savings = sequelize.define("savings", {
        Name: {
            type: Sequelize.STRING
        },
        Price: {
            type: Sequelize.INTEGER
        }
    });
    return Savings;
};