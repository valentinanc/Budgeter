const UserProfileModel = require("../models/model.user-profile");
const db = require("../config/db.initialize.js");
const UserProfile = db.userProfile;

/* static user profile service class */
class UserProfileService
{
	static async getUserProfileId(data)
	{
		let profile = await UserProfile.findOne({
			where: {
				userId: data,
			}
		})
		return profile.id;
	}

	static async getUserProfile(data)
	{
		let profile = await UserProfile.findOne({
			where: {
				userId: data,
			}
		})
		return profile;
	}

	static async updateAboutYou(data)
	{
		let profile = await UserProfile.findOne({
			where: {
				userId: data["id"],
			}
		})
		profile.update({MBudget: data["budget"], MExpenses: data["expenses"], MSavings: data["savings"]})
		return profile;
	}

	static async updateTotalExpenses(data)
	{
		let profile = await UserProfile.findOne({
			where: {
				userId: data["id"],
			}
		})
		profile.update({MExpenses: data["expenses"]})
		return profile;
	}

	static async updateTotalBudget(data)
	{
		let profile = await UserProfile.findOne({
			where: {
				userId: data["id"],
			}
		})
		profile.update({MBudget: data["budget"]})
		return profile;
	}

	static async updateTotalSavings(data)
	{
		let profile = await UserProfile.findOne({
			where: {
				userId: data["id"],
			}
		})
		profile.update({MSavings: data["savings"]})
		return profile;
	}
}

module.exports = UserProfileService;