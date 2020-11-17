const CustomerModel = require("../models/model.customer");
let Validator = require('fastest-validator');
const db = require("../config/db.initialize.js");
const Tutorial = db.tutorials;
const User = db.user;
const UserProfile = db.userProfile;
const Op = db.Sequelize.Op;
let customers = {};
let counter = 0;

/* create an instance of the validator */
let customerValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;

/* customer validator shema */
const customerVSchema = {
		guid: {type: "string", min: 3},
		
		first_name: { type: "string", min: 1, max: 50, pattern: namePattern},
		last_name: { type: "string", min: 1, max: 50, pattern: namePattern},
		email: { type: "email", max: 75 },
		password: { type: "string", min: 2, max: 50}
	};

/* static customer service class */
class CustomerService
{
	static create(data)
	{
		// var vres = customerValidator.validate(data, customerVSchema);
		
		// /* validation failed */
		// if(!(vres === true))
		// {
		// 	let errors = {}, item;

		// 	for(const index in vres)
		// 	{
		// 		item = vres[index];

		// 		errors[item.field] = item.message;
		// 	}
			
		// 	throw {
		// 	    name: "ValidationError",
		// 	    message: errors
		// 	};
		// }
		// Retrieve all Tutorials from the database.
		console.log("data given: ", data)
		const user =  User.create(
			{
				FName: data["first_name"],
				LName: data["last_name"],
				Email: data["email"],
				Password: data["password"]
			});
		const userProfile =  UserProfile.create(
			{
				MBudget: 0,
				MExpenses: 0,
				MSavings: 0,
				userId: user.id
			});
		let temp2 = "test";
		// Tutorial.findAll({ where: { published: true } })
		// .then(data => {
		// 	json = JSON.stringify(data)
		// 	console.log("json: ", json)
		// 	temp2 = json["title"]
		// })
		// .catch(err => {
		// 	// res.status(500).send({
		// 	// message:
		// 	// 	err.message || "Some error occurred while retrieving tutorials."
		// 	// });
		// });
	

		let customer = new CustomerModel(user.FName, user.LName, user.Email, user.Password);

		customer.uid = temp2 + counter++;

		customers[customer.uid] = customer;

		return customer;
	}

	static retrieve(uid)
	{
		if(customers[uid] != null)
		{
			return customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(customers[uid] != null)
		{
			const customer = customers[uid];
			
			Object.assign(customer, data);
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(customers[uid] != null)
		{
			delete customers[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
		}
	}
}

module.exports = CustomerService;