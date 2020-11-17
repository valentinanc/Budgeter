module.exports = (sequelize, Sequelize) => {
    const FinancialGoals = sequelize.define("financial_goals", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING
      },
      IsCompleted: {
        type: Sequelize.BOOLEAN
      }
    });
    return FinancialGoals;
};