const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const UserProfile = sequelize.define("user_profile", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
      },
      MBudget: {
        type: Sequelize.DOUBLE
      },
      MExpenses: {
        type: Sequelize.DOUBLE
      },
      MSavings: {
        type: Sequelize.DOUBLE
      },
    }, {});
    UserProfile.beforeCreate(user_profile => user_profile.id = uuidv4());
    return UserProfile;
};