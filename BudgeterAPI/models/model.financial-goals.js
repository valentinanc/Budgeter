class FinancialGoalsModel
{
	constructor(name, isCompleted, userProfileId)
	{
		this.name = name;
        this.isCompleted = isCompleted;
        this.userProfileId = userProfileId;
		this.id = null;
	}
}

module.exports = FinancialGoalsModel;