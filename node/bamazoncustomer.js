require("dotenv").config();

//Node Modules
const mysql         = require('mysql');
const inquirer      = require('inquirer');
const request       = require('request');
const axios         = require('axios');


// sql node server configuration not sure how to get this working

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.username,
  password : process.env.password,
  database : 'bamazondb'
});

connection.connect();
// SELECT * from solution WHERE product = 'yourconsoleinput'
connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;

});

console.log("connected!");

connection.end();
// Inquirer Prompt for Customer

inquirer.prompt([
  {
    type: "input",
    name: "custProduct",
    message: "What product would you like to buy? You can use the item_id or the item's name."
  },{
    type: "input",
    name: "custAmount",
    message: "How many would you like to buy?"
  }]).then(function(answers){
      let custProduct     = answers.custProduct;
      let custAmount      = answers.custAmount;

  /*
      console.log(custProduct);
      console.log(custAmount);
     */

});


