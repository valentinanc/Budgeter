class UserProfileModel
{
	constructor(mBudget, mExpenses, mSavings, userId)
	{
		this.mBudget = mBudget;
        this.mExpenses = mExpenses;
        this.mSavings = mSavings;
		this.userId = userId;
	}
}

module.exports = UserProfileModel;