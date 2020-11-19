const FinancialGoalsModel = require("../models/model.financial-goals");
const db = require("../config/db.initialize.js");
const FinancialGoals = db.financialGoals;


/* static financial goals service class */
class FinancialGoalsService
{
	static async create(data)
	{
		// Retrieve all Tutorials from the database.
		const goal =  await FinancialGoals.create(
			{
				Name: data["name"],
				IsCompleted: data["isCompleted"],
				userProfileId: data["userProfileId"]              
			}).catch(err => {
				console.log("error creating financial goal")
			});
		if (goal == undefined){
			return null;
		}
		let financialGoal = new FinancialGoalsModel(goal.name, goal.isCompleted, goal.createdAt, goal.updatedAt, goal.userProfileId);
		return financialGoal;

    }
    
    static async getFinancialGoals(data)
	{
		let financialGoals = await FinancialGoals.findAll({
			where: {
				userProfileId: data,
			}
		})
		return financialGoals;
    }
    
    static async deleteFinancialGoal(data)
	{
		let financialGoal = await FinancialGoals.destroy({
			where: {
				id: data,
			}
		})
		return financialGoal;
    }
    
    static async editFinancialGoal(data)
	{
		let financialGoal = await FinancialGoals.update(
            { Name: data["name"],  IsCompleted: data["isCompleted"]}, {
			where: {
                id: data["id"]
			}
		})
		return financialGoal;
	}
}

module.exports = FinancialGoalsService;