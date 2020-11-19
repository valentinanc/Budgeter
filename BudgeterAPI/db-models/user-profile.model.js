const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const UserProfile = sequelize.define("user_profile", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
      },
      MBudget: {
        type: Sequelize.INTEGER
      },
      MExpenses: {
        type: Sequelize.INTEGER
      },
      MSavings: {
        type: Sequelize.INTEGER
      },
    }, {});
    UserProfile.beforeCreate(user_profile => user_profile.id = uuidv4());
    return UserProfile;
};