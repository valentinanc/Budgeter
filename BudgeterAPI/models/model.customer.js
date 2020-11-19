class CustomerModel
{
	constructor(first_name, last_name, email, password, id)
	{
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.uid = id;
	}
}

module.exports = CustomerModel;