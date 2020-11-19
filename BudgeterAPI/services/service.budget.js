const db = require("../config/db.initialize.js");
const UserProfileService = require("../services/service.user-profile");
const Category = db.categories;
const UserProfile = db.userProfile;
const Budget = db.budget;


/* static budget service class */
class BudgetService
{
	static async addCategories(data)
	{
		console.log("data categories: ", data)
		let userId = data.userId
		let userProfileId = await UserProfileService.getUserProfileId(userId)
		console.log("user profile id: ", userProfileId)
		let budgetId = await this.getBudgetId(userProfileId)
		let categories = data.body;
		let listResult = []
		for(let ct of categories) {
			let categoryName = ct.name
			let cat = await Category.create({
				Name: categoryName,
				budgetId: budgetId
			})
			listResult.push(cat)
		}
		return listResult;
	}

	static async changeBudget(data)
	{
		let userId = data.userId
		let monthlyBudget = data.body.mbudget
		let monthlySavings = data.body.msavings
		let monthlyExpenses = data.body.mexpenses
		let userProfile = await UserProfile.update(
            { MBudget: monthlyBudget,  MExpenses: monthlyExpenses, MSavings: monthlySavings}, {
			where: {
                userId: userId
			}
		})
		return userProfile;
	}


	static async getBudgetId(id)
	{
		let budget = await Budget.findOne({
			where: {
				userProfileId: id,
			}
		})
		return budget.id;
	}
}

module.exports = BudgetService;