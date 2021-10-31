'use strict'

require('dotenv').config();

const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 8000;

const envParams = {
    dbName: process.env.MONGODB_DATABASE, 
    useNewUrlParser: process.env.MONGODB_URLPARSER
}

mongoose.connect(process.env.MONGODB_URL, envParams).then(() => {
    console.log("Successfully connected to database");
    app.listen(port);
}).catch(err => {
    console.log(err);
});