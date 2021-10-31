'use strict'

const express = require('express');
const ExpensesController = require('../controllers/expenses.controller');

const router = express.Router();

//Routes
router.get('/expenses/date/:id', ExpensesController.getExpenses);
router.get('/expenses/:id', ExpensesController.getExpense);
router.post('/expenses', ExpensesController.createExpense);
router.put('/expenses/:id', ExpensesController.updateExpense);
router.delete('/expenses/:id', ExpensesController.destroyExpense);

module.exports = router;