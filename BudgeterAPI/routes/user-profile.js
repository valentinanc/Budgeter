var express = require('express');
var router = express.Router();
var UserProfileService = require('../services/service.user-profile');


/* retrieves a user profile id by user id */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const userProfile = await UserProfileService.getUserProfileId(req.params.id);
        console.log(userProfile);
		return res.json({ userProfileId: userProfile});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

router.get('/:id/info', async (req, res, next) =>
{
	try
	{
		const userProfile = await UserProfileService.getUserProfile(req.params.id);
        console.log(userProfile);
		return res.json({ userProfile: userProfile});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;