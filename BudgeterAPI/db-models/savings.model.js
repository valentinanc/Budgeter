module.exports = (sequelize, Sequelize) => {
    const Savings = sequelize.define("savings", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: Sequelize.STRING
        },
        Price: {
            type: Sequelize.INTEGER
        }
    });
    return Savings;
};