module.exports = (sequelize, Sequelize) => {
    const UserProfile = sequelize.define("user_profile", {
      MBudget: {
        type: Sequelize.INTEGER
      },
      MExpenses: {
        type: Sequelize.INTEGER
      },
      MSavings: {
        type: Sequelize.INTEGER
      }
    });
    return UserProfile;
};