module.exports = (sequelize, Sequelize) => {
    const FinancialGoals = sequelize.define("financial_goals", {
      Name: {
        type: Sequelize.STRING
      },
      IsCompleted: {
        type: Sequelize.BOOLEAN
      }
    });
    return FinancialGoals;
};