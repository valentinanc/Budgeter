module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
      Name: {
        type: Sequelize.STRING
      }
    });
    return Categories;
};