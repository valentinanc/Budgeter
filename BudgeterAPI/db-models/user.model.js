const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        // autoIncrement: true
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
    }, {});
    User.beforeCreate(user => user.id = uuidv4());
    return User;
};