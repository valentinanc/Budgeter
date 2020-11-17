module.exports = (sequelize, Sequelize) => {
    const UserProfile = sequelize.define("user_profile", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      // userId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //      model: 'user', // 'user' refers to table name
      //      key: 'id', // 'id' refers to column name in persons table
      //   }
      // }
    });
    return UserProfile;
};