'use strict'

const { v4: uuidv4 } = require('uuid');
const Expense = require('../models/expenses.model');

const ExpensesController = {

    getExpenses: (req, res) => {
        var expensesDate = req.params.id;
        var expensesYear = expensesDate.slice(0,4);
        var expensesMonth = expensesDate.slice(5,8);
        
        Expense.find({year: expensesYear, month: expensesMonth}, (err, expenses) => {
            if(err){
                return res.status(500).send({
                    message: 'Ha ocurrido un error al intentar obtener las expensas.'
                });
            }
            if(!expenses){
                return res.status(404).send({
                    message: 'No hay expensas que mostrar.'
                });
            }
            return res.status(200).send({expenses});
        });
    },

    getExpense: (req, res) => {
        var expenseID = req.params.id;

        Expense.findById(expenseID, (err, expense) => {
            if(err){
                return res.status(500).send({
                    message: 'Ha ocurrido un error al intentar obtener las expensa.'
                });
            }
            if(!expense){
                return res.status(404).send({
                    message: 'Esta expensa no existe.'
                });
            }
            return res.status(200).send({expense});
        });
    },
    
    createExpense: (req, res) => {
        var expense = req.body;

        var date = new Date();
        var expenseMonth = date.getMonth() + 1;
        var expenseYear = date.getFullYear();
        
        if(expense.installments != '' && expense.installments != 1) {

            var installmentID = uuidv4();
            var installmentsArray = [];
            var installmentMonthlyAmount = expense.amount / expense.installments;
            
            for (let i = 0; i < expense.installments; i++) {
                if(expenseMonth > 12) {
                    expenseMonth = 1;
                    expenseYear++;
                }
                installmentsArray[i] = {
                    name: expense.name,
                    amount: installmentMonthlyAmount,
                    installmentID: installmentID,
                    category: expense.category,
                    month: expenseMonth,
                    year: expenseYear
                }
                expenseMonth++;
            }

            Expense.insertMany(installmentsArray, (err, expense) => {
                if(err) {
                    return res.status(500).send({
                        message: 'Ha ocurrido un error guardando la expensa.'
                    });
                }
                if(!expense) {
                    return res.status(400).send({
                        message: 'Esta expensa no existe.'
                    });
                }
                return res.status(200).send({expense});
            });        
        }
        else { 
            new Expense({
                name: expense.name,
                amount: expense.amount,
                category: expense.category,
                month: expenseMonth,
                year: expenseYear
            }).save((err, expense) => {
                if(err) {
                    return res.status(500).send({
                        message: 'Ha ocurrido un error guardando la expensa.'
                    });
                }
                if(!expense) {
                    return res.status(400).send({
                        message: 'Esta expensa no existe.'
                    });
                }
                return res.status(200).send({expense});
            });
        }
    },

    updateExpense: (req, res) => {
        var expenseID = req.params.id;
        var updatedExpense = req.body;

        Expense.findByIdAndUpdate(expenseID, updatedExpense, {new: true}, (err, updatedExpense) => {
            if(err){
                return res.status(500).send({
                    message: 'Ha ocurrido un error al intentar actualizar la expensa.'
                });
            }
            if(!updatedExpense){
                return res.status(404).send({
                    message: 'Esta expensa no existe.'
                });
            }
            return res.status(200).send({updatedExpense});
        });
    },

    destroyExpense: (req, res) => {
        var expenseID = req.params.id;

        Expense.findByIdAndDelete(expenseID, (err, destroyedExpense) => {
            if(err){
                return res.status(500).send({
                    message: 'Ha ocurrido un error al intentar borrar la expensa.'
                });
            }
            if(!destroyedExpense){
                return res.status(404).send({
                    message: 'Esta expensa no existe.'
                });
            }
            return res.status(200).send({destroyedExpense});
        });
    }

}

module.exports = ExpensesController;