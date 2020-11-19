var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var generate_uid = require('./routes/generate_uid');
var customer = require('./routes/customer');
var financialGoals = require('./routes/financial-goals');
var userProfile = require('./routes/user-profile');

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/customer', customer);
app.use('/api/generate_uid', generate_uid);
app.use('/api/financial-goals', financialGoals);
app.use('/api/user-profile', userProfile);

const db = require("./config/db.initialize.js");

//DROPS ALL TABLE RECORDS & RECREATES TABLES
// db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
// .then(function(){
//     return db.sequelize.sync({ force: true });
// })
// .then(function(){
//     return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
// })
// .then(function(){
//     console.log('Database synchronised.');
// }, function(err){
//     console.log(err);
// });

// keeps tables 
db.sequelize.sync();

module.exports = app;