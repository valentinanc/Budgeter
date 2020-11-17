const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("../models/tutorial.model.js")(sequelize, Sequelize);

// Create the tables

db.budget  = require("../db-models/budget.model.js")(sequelize, Sequelize);
db.categories  = require("../db-models/categories.model.js")(sequelize, Sequelize);
db.expense  = require("../db-models/expense.model.js")(sequelize, Sequelize);
db.financialGoals  = require("../db-models/financial-goals.model.js")(sequelize, Sequelize);
db.savings  = require("../db-models/savings.model.js")(sequelize, Sequelize);
db.userProfile  = require("../db-models/user-profile.model.js")(sequelize, Sequelize);
db.user  = require("../db-models/user.model.js")(sequelize, Sequelize);

// Build Relationships

db.user.hasOne(db.userProfile);
db.userProfile.hasOne(db.financialGoals);
db.userProfile.hasOne(db.budget);
db.budget.hasMany(db.expense);
db.budget.hasMany(db.savings);
db.budget.hasMany(db.categories);
db.expense.hasOne(db.categories);
db.savings.hasOne(db.categories);

module.exports = db;