'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//CORS
const corsOptions = {
    allowedHeaders: ["x-access-token", "Origin", "Content-Type", "Accept"]
}
app.use(cors(corsOptions));

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Load routes
const expensesRoutes = require('./routes/expenses.routes')

//Routes
app.use('', [
    expensesRoutes
]);

//Exports
module.exports = app;