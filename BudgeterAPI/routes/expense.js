var express = require('express');
var router = express.Router();
var ExpenseService = require('../services/service.expense');

/* add new fin goal */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const expense = await ExpenseService.create(body);
		return res.status(201).json({ expense: expense });
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
		const expense = await ExpenseService.getExpenses(req.params.id);
		return res.json(expense);
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
		const expense = await ExpenseService.deleteExpenses(req.params.id);
		return res.json(expense);
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
		const expense = await ExpenseService.editExpenses(body);
		return res.status(201).json({ expense: expense });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});


module.exports = router;