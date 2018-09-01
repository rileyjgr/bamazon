// require("dotenv").config();

//Node Modules
const mysql         = require('mysql');
const inquirer      = require('inquirer');
const request       = require('request');
const axios         = require('axios');
const csv           = require('csv');


// sql node server configuration not sure how to get this working

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port     :  3306
});

connection.connect();

connection.end();
