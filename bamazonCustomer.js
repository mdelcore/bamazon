// required npm packages for project
var mysql = require("mysql");
var inquirer = require("inquirer")

// SQL database connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password:"root",
	database: "bamazon",
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
})

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
  	connection.end();
})
