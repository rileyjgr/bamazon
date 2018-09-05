// require("dotenv").config();
'use strict';

//Node Modules
const mysql         = require('mysql');
const inquirer      = require('inquirer');
const cTable        = require('console.table');
const deasync       = require('deasync');
const cp            = require('child_process');
const exec          = deasync(cp.exec);
//not needed atm. here incase i do
const axios         = require('axios');

// sql node server configuration not sure how to get this working

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port     :  3306
});

connection.connect();


// show the list


let id = 'products';

connection.query('select * from bamazon.products',
function(err, rows){
  if (err) {
    console.log(err);
    return;
  }
    // shows the table nice and neat. Thanks to my friend on discord CrazyInfin8#7283 for helping so much with this
    function print(rows) {
    // Find Max item string length of each column
    var max = {item_id: 2, product_name: 4, department_name: 11, price: 5, stock_quantity: 5};
    for(let i = 0; i < rows.length; i++) {
        max.item_id = (rows[i].item_id.toString().length > max.item_id) ? rows[i].item_id.toString().length : max.item_id;
        max.product_name = (rows[i].product_name.length > max.product_name) ? rows[i].product_name.length : max.product_name;
        max.department_name = (rows[i].department_name.length > max.department_name) ? rows[i].department_name.length : max.department_name;
        max.price = (rows[i].price.toString().length > max.price) ? rows[i].price.toString().length : max.price;
        max.stock_quantity = (rows[i].stock_quantity.toString().length > max.stock_quantity) ? rows[i].stock_quantity.toString().length : max.stock_quantity;
    }

}

print(rows);
const table = rows;
console.table(table);
goPrompt();
});


// Inquirer Prompt for Customer

const goPrompt = () => {
inquirer.prompt([
  // this line is logging before the sql? why...? probably need the wait function
  {
    type: "input",
    name: "warning",
    message: "Use this app to buy some products from BAMAZON the next big node app. You can press cntrl + c at anytime to exit. Press enter to continue."
  },{
    type: "input",
    name: "custProduct",
    message: "What product would you like to buy? You can use the item_id."
  },{
    type: "input",
    name: "custAmount",
    message: "How many would you like to buy?"
  }]).then(function(answers){
      // something is off on this then(function) because it is ending my app before it makes the request below.
    let custProduct     = answers.custProduct;
    let custAmount      = answers.custAmount;
    let sql             = 'update products set stock_quantity = stock_quantity - ? where item_id = ?';
    let data            = [custAmount, custProduct];
    let updateSuper     = 'update supervisor set product_sales = product_sales + ? where department_id = ?';
    // switch statement to get the department_id
    // i feel like this will be the best way to get the department_id for the supervisor table
    // let updateData      = {
    //   switch(case){
    //     case 1:
    //     case 2:
    //     case 4:
    //     case 5:
    //     case 6:
    //     case 7:
    //     case 8:
    //     case 9:
    //     case 10:
    //   }
    // }
  //passes and subtracts from the db
  connection.query(sql, data,
      function(err, rows){
      if (err) {
        console.log(err);
        return;
      }
    const table2 = rows;
    console.table(table2);

    connection.end();
  })
  // this will be used to update the supervisor table
  // connection.query(updateSuper, updateData,
  // function(err, rows_){
  //   if(err) {
  //       console.log(err);
  //   }
  //   const table3 = rows;
  //   // console.table(table3);
  //   connection.end();
  // })
});
}

