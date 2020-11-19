const CustomerModel = require("../models/model.customer");
const db = require("../config/db.initialize.js");
const User = db.user;
const UserProfile = db.userProfile;
var sha1 = require('sha1');


/* static customer service class */
class CustomerService
{
	static async create(data)
	{
		// Retrieve all Tutorials from the database.
		let userId = -1
		let json = null
		let jsonParse = null
		const user =  await User.create(
			{
				FName: data["firstName"],
				LName: data["lastName"],
				Email: data["email"],
				Password: sha1(data["password"])
			}).catch(err => {
				console.log("error creating user")
			}).then(result => {
				json = JSON.stringify(result)
				jsonParse = JSON.parse(json)
				userId = jsonParse["id"]
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
		if (user == undefined){
			return null;
		}
		let customer = new CustomerModel(user.FName, user.LName, user.Email, user.Password, userId);
		return customer;
	}

	static async login(data)
	{
		let customer = await User.findOne({
			where: {
				email: data["email"],
				password: sha1(data["password"])
			}
		})
		return customer;
	}

	static async updatePassword(data)
	{
		let customer = await User.findOne({
			where: {
				email: data["email"],
			}
		})
		customer.update({Password: sha1(data["password"])})
		return customer;
	}
	
	static async retrieve(data)
	{
		let customer = await User.findOne({
			where: {
				id: data,
			}
		})
		return customer;
	}
}

module.exports = CustomerService;