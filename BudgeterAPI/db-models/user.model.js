module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      FName: {
        type: Sequelize.STRING
      },
      LName: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      }
    });
    return User;
};