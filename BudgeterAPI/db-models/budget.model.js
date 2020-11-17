module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
      Total: {
        type: Sequelize.INTEGER
      }
    });
    return Budget;
};