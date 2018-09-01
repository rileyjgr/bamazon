require("dotenv").config();

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


// show the list
console.log(names);

let id = 'products';
// gets the response from the server
connection.query('select * from bamazon.products',
function(err, rows){
  if (err) {
    console.log(err);
    return;
  }

  rows.forEach(function(result) {

    let id         =  result.item_id;
    let name       =  result.product_name;
    let department =  result.department_name;
    let price      =  result.price;
    let amount     =  result.stock_quantity;

    // just to filter out bs
    console.log('                          ');

    //ids for table
    let names = 'id ' + 'item ' + 'department ' + 'price ' + 'stock ';
    // show the table
    console.log(id, name, department, price, amount);
  });
});

// need to add something to wait for response from sql server



// wait for user resonse function
function loop() {


}

// Inquirer Prompt for Customer
inquirer.prompt([
  // this line is logging before the sql? why...? probably need the wait function
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

connection.end();

