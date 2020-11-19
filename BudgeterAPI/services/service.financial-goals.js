const FinancialGoalsModel = require("../models/model.financial-goals");
const db = require("../config/db.initialize.js");
const FinancialGoals = db.financialGoals;

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;

/* financial goal validator shema */
const financialGoalVSchema = {
		id: {type: "string", min: 3},
		name: { type: "string", min: 1, max: 100, pattern: namePattern},
		is_completed: { type: "Number"},
		// created_at: { type: "string", max: 75 },
        // updated_at: { type: "string", min: 2, max: 50},
        user_profile_id: { type: "string", min: 2, max: 50}
	};

/* static financial goals service class */
class FinancialGoalsService
{
	static async create(data)
	{
		// Retrieve all Tutorials from the database.
		console.log("data given: ", data)
		const goal =  await FinancialGoals.create(
			{
				Name: data["name"],
				IsCompleted: data["isCompleted"],
				userProfileId: data["userProfileId"]              
			}).catch(err => {
				console.log("error creating financial goal")
			});
		console.log("financial goal: ", goal)
		if (goal == undefined){
			return null;
		}
		let financialGoal = new FinancialGoalsModel(goal.name, goal.isCompleted, goal.createdAt, goal.updatedAt, goal.userProfileId);
		return financialGoal;

    }
    
    static async getFinancialGoals(data)
	{
		console.log("data: ", data);
		let financialGoals = await FinancialGoals.findAll({
			where: {
				userProfileId: data,
			}
		})
		console.log("test: ", financialGoals);
		return financialGoals;
	}
}

module.exports = FinancialGoalsService;