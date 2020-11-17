const CustomerModel = require("../models/model.customer");
let Validator = require('fastest-validator');
const db = require("../config/db.initialize.js");
const User = db.user;
const UserProfile = db.userProfile;
let counter = 0;

/* static customer service class */
class CustomerService
{
	static async create(data)
	{
		// Retrieve all Tutorials from the database.
		console.log("data given: ", data)
		let userId = -1
		let json = null
		let jsonParse = null
		const user =  await User.create(
			{
				FName: data["firstName"],
				LName: data["lastName"],
				Email: data["email"],
				Password: data["password"]
			})
			.catch(err => {
				console.log("error creating user")
			})
			.then(result => {
				json = JSON.stringify(result)
				jsonParse = JSON.parse(json)
				userId = jsonParse["id"]
				console.log("json: ", jsonParse)
				console.log("userId", userId)
				UserProfile.create(
					{
						MBudget: 0,
						MExpenses: 0,
						MSavings: 0,
						userId: userId
					});
				return result
			}).catch(err => {
				console.log("error creating user profile")
			});
		console.log("user: ", user)
		if (user == undefined){
			return null;
		}
		let customer = new CustomerModel(user.FName, user.LName, user.Email, user.Password);
		customer.uid = "cid" + counter++;
		return customer;

	}

	static login(data)
	{
		console.log("data: ", data);
		let customer = User.findOne({
			where: {
				email: data["email"],
				password: data["password"]
			}
		})
		console.log("test: ", customer);
		return customer;
	}
	
	// static retrieve(uid)
	// {
	// 	if(customers[uid] != null)
	// 	{
	// 		return customers[uid];
	// 	}
	// 	else
	// 	{
	// 		throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
	// 	}
	// }

	// static update(uid, data)
	// {
	// 	if(customers[uid] != null)
	// 	{
	// 		const customer = customers[uid];
			
	// 		Object.assign(customer, data);
	// 	}
	// 	else
	// 	{
	// 		throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
	// 	}
	// }

	// static delete(uid)
	// {
	// 	if(customers[uid] != null)
	// 	{
	// 		delete customers[uid];
	// 	}
	// 	else
	// 	{
	// 		throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
	// 	}
	// }
}

module.exports = CustomerService;