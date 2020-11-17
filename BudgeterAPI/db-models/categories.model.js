module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING
      }
    });
    return Categories;
};