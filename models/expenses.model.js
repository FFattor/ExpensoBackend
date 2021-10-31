'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    installmentID: String,
    category: {type: String, required: true},
    month: {type: Number, required: true},
    year: {type: Number, required: true}
});

module.exports = mongoose.model('Expense', ExpensesSchema);