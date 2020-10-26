const CustomerModel = require("../models/model.customer");
let Validator = require('fastest-validator');


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

		let customer = new CustomerModel(data.first_name, data.last_name, data.email, data.password);

		customer.uid = 'c' + counter++;

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