module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Total: {
        type: Sequelize.INTEGER
      }
    });
    return Budget;
};