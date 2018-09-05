// require("dotenv").config();

//Node Modules
const mysql         = require('mysql');
const inquirer      = require('inquirer');
const axios         = require('axios');
const csv           = require('csv');
const cTable        = require('console.table');
const deasync       = require('deasync');
const cp            = require('child_process');
const exec          = deasync(cp.exec);

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
        'Set total_Profit',
         'View Data',
          'Reset Table'
        ]}
]).then(answers => {
    /*
   1. Have to add an alias for sql not really sure what this is yet but have to do it
   2. Have to add a function in bamazoncustomer.js that sends the data to the supervisor
   table to add product sales
   3. Have to add a function in mysql (supervisor table) that takes the price of the product
   from the products table.
   4. Have to add a function in sql that (product_sales * price) - over_head_costs
   5. Then we are done bb
   */
    const response = answers.supervisor;
    switch (response) {
        case 'Set total_Profit':
        let sql = 'update supervisor set total_profit = product_sales - over_head_costs';

        //passes and subtracts from the db
        connection.query(sql,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }

                const table = rows;
                console.table(table);

                connection.end();
            });
        break;
        case  'View Data':

            connection.query('select * from bamazon.supervisor',
                function(err, rows){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const table = rows;
                    console.table(table);
                    connection.end();
                });
         break;
        case 'Reset Table':
            let sql1 = 'update supervisor set total_profit = 0';
            connection.query(sql1,
                function (err, rows) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    const table = rows;
                    console.table(table);

                    connection.end();
                });
    }
});