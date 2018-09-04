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
        'View Data from Departments'
        ]}
]).then(answers => {

    const response = answers.supervisor;

    let sql = 'select * from bamazon.supervisor';

  //passes and subtracts from the db
  connection.query(sql,
      function(err, rows){
      if (err) {
        console.log(err);
        return;
      }
    const table = rows;
    console.table(table);

    connection.end();
  })

});

