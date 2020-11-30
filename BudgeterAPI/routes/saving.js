var express = require('express');
var router = express.Router();
var SavingService = require('../services/service.savings');

/* add new fin goal */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const savings = await SavingService.create(body);
		return res.status(201).json({ savings: savings });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* get fin goal for a given user profile id */
router.get('/:id', async (req, res, next) =>
{
	try
	{
        console.log("reaching id",req.params.id)
		const savings = await SavingService.getSavings(req.params.id);
		return res.json(savings);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* delete fin goal for a given financial goal id */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const savings = await SavingService.deleteSavings(req.params.id);
		return res.json(savings);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});
/* edit fin goal */
router.put('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const savings = await SavingService.editSavings(body);
		return res.status(201).json({ savings: savings });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});


module.exports = router;