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

router.post('/about-you-settings/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const userProfile = await UserProfileService.updateAboutYou(body);
		console.log(userProfile);
		return res.status(201).json({ userProfile: userProfile });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

module.exports = router;