const UserProfileModel = require("../models/model.user-profile");
const db = require("../config/db.initialize.js");
const UserProfile = db.userProfile;

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;

/* financial goal validator shema */
const userProfileVSchema = {
		id: {type: "string", min: 3},
		mBudget: { type: "string", min: 1, max: 100, pattern: namePattern},
        mExpenses: { type: "string", min: 1, max: 100, pattern: namePattern},
        mSavings: { type: "string", min: 1, max: 100, pattern: namePattern},
        user_id: { type: "string", min: 2, max: 50}
	};

/* static user profile service class */
class UserProfileService
{
	static async getUserProfileId(data)
	{
		console.log("data: ", data);
		let profile = await UserProfile.findOne({
			where: {
				userId: data,
			}
		})
		console.log("test: ", profile);
		return profile.id;
	}
}

module.exports = UserProfileService;