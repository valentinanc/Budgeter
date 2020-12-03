
const db = require("../config/db.initialize.js");
const  Savings = db.savings;
const UserProfile = db.userProfile;
const Budget = db.budget;


/* static financial goals service class */
class SavingsService
{
	static async create(data)
	{
		// Retrieve all Tutorials from the database.
		const savings =  await Savings.create(
			{
				Name: data["name"],
				Price: data["price"],
				budgetId: data["budgetId"]              
			}).catch(err => {
				console.log("error creating financial goal")
			})
		if (savings == undefined){
			return null;
		} else{
			// get user profile id from budgetid
			let budget = await Budget.findOne({
				where: {
					id: data["budgetId"],
				}
			})
			var userProfileId = budget.userProfileId;
			var price = data["price"]
			await UserProfile.increment('MSavings', {by: price, where: {id: userProfileId}});
		}
		return savings
    }
    
    static async getSavings(data)
	{
		let savings = await Savings.findAll({
			where: {
				budgetId: data,
			}
			
		})
		return savings;
    }
    
    static async deleteSavings(data)
	{
		let savings = await Savings.destroy({
			where: {
				id: data,
			}
		})
		return savings;
    }
    
    static async editSavings(data)
	{
		let savings = await Savings.update(
            { Name: data["name"],  IsCompleted: data["isCompleted"]}, {
			where: {
                id: data["id"]
			}
		})
		return savings;
	}

	static async getSaving(savingId)
	{
		let saving = await Savings.findOne({
			where: {
				id: savingId,
			}
		})
		return saving;
	}
}

module.exports = SavingsService;