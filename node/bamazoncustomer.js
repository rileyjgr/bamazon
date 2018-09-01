// require("dotenv").config();

//Node Modules
const mysql         = require('mysql');
const inquirer      = require('inquirer');
const cTable        = require('console.table');

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
// needs promise handling to
// gets the response from the server
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
console.log('                      '); // this will have to be removed later on
print(rows);
const table = rows;
console.table(table);
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
    let sql = 'update products set stock_quantity = stock_quantity - ? where item_id = ?';
    let data = [custAmount, custProduct];

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

});


