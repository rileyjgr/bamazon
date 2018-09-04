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

inquirer.prompt([
     {
      type: 'list',
      name: 'supervisor',
      message: 'What do you want to do?',
      choices: [
        'View Data from Departments'
        ]}
]).then(answers => {



}
connection.end();
