var express = require('express');
var router = express.Router();
var BudgetService = require('../services/service.budget');


router.post('/addCategories/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const categories = await BudgetService.addCategories(body);
		// created the categories! 
		return res.status(201).json({ categories: categories });
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


router.post('/addCategoryExpense/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const categories = await BudgetService.addCategoryExpense(body);
		// created the categories! 
		return res.status(201).json({ categories: categories });
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

router.post('/addCategorySavings/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const categories = await BudgetService.addCategorySavings(body);
		// created the categories! 
		return res.status(201).json({ categories: categories });
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

router.put('/editCategory/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const category = await BudgetService.editCategory(body);
		return res.status(201).json({ category: category });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

router.delete('/deleteCategory/:name', async (req, res, next) =>
{
	try
	{
		const category = await BudgetService.deleteCategory(req.params.name);
		return res.json(category);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});




router.get('/getCategories/:id', async (req, res, next) =>
{
	try
	{
		const categories = await BudgetService.getCategories(req.params.id);
		return res.json(categories);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});



router.post('/changeBudget/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const budget = await BudgetService.changeBudget(body);
		// created the categories! 
		return res.status(201).json({ budget: budget });
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


router.get('/getBudgetId/:userId', async (req, res, next) =>
{
	try
	{
		const budgetId = await BudgetService.getBudgetId(req.params.userId);
		return res.json(budgetId);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});


router.get('/getBudgetBreakdownCategories/:id', async (req, res, next) =>
{
	try
	{
		const categories = await BudgetService.getBudgetBreakdownCategories(req.params.id);
		return res.json(categories);
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});


module.exports = router;