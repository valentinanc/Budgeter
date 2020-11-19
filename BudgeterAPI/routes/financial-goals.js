var express = require('express');
var router = express.Router();
var FinancialGoalsService = require('../services/service.financial-goals');

/* add new fin goal */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const financialGoal = await FinancialGoalsService.create(body);
		return res.status(201).json({ financialGoal: financialGoal });
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

/* get fin goal for a given user profile id */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const financialGoals = await FinancialGoalsService.getFinancialGoals(req.params.id);
        console.log(financialGoals);
		return res.json(financialGoals);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});


module.exports = router;