module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FName: {
        type: Sequelize.STRING
      },
      LName: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING,
        unique: true
      },
      Password: {
        type: Sequelize.STRING
      }
    });
    return User;
};