
const db = require("../config/db.initialize.js");
const Expenses = db.expense;


/* static financial goals service class */
class ExpensesService
{
	static async create(data)
	{
		// Retrieve all Tutorials from the database.
		const expense =  await Expenses.create(
			{
				Name: data["name"],
				Price: data["price"],
				budgetId: data["budgetId"]              
			}).catch(err => {
				console.log("error creating financial goal")
			});
		if (expense == undefined){
			return null;
		}
		return expense

    }
    
    static async getExpenses(data)
	{
		let expenses = await Expenses.findAll({
			where: {
				budgetId: data,
			}
		})
		return expenses;
    }
    
    static async deleteExpenses(data)
	{
		let expenses = await Expenses.destroy({
			where: {
				id: data,
			}
		})
		return expenses;
    }
    
    static async editExpenses(data)
	{
		let expenses = await Expenses.update(
            { Name: data["name"],  IsCompleted: data["isCompleted"]}, {
			where: {
                id: data["id"]
			}
		})
		return expenses;
	}
}

module.exports = ExpensesService;