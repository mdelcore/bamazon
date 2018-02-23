// required npm packages for project
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
	// console.log("connected as id " + connection.threadId);
  	console.log("\x1b[45m%s\x1b[0m", "Welcome to Bamazon! Here are our products:")
  	// displayProducts();
  	enterStore();
})

// function to enter store
function enterStore() {
	inquirer.prompt([{
		name: 'entrance',
		message: 'Would you like to shop with us today?',
		type: 'list',
		choices: ['yes', 'No']

	}]).then(function(answer) {
		if (answer.entrance === 'Yes') {
			displayProducts();
		// } else {
		// 	console.log('Please come back soon!  --Bamazon');
		// 	connection.destroy();
		// 	return;
		}
	});
}

// * -- display all items for sale
var displayProducts = function() {
	var table = new Table ({
		head: ["Item ID", "Product Name", "Department", "Cost", "Stock"],
		colWidths: [10, 25, 20, 8 ,8]
	});
	var query = "SELECT * FROM products"
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++) {
			table.push([res[i].item_id, res[i].productName,res[i].departmentName, res[i].price, res[i].stockQuantity]);
		}
		console.log(table.toString());
		shoppingCart();
	})
}

// * -- Users should then be prompted with two messages:
//        -- The first message should ask them the ID of the product they would like to buy    --
//        -- The second message should ask them how many of the product they would like to buy --

var shoppingCart = function () {
	inquirer.prompt([{
		name: "item_id",
		type: "input",
		message: "What is the ID of the product you would like to buy?",
		// Validate: checks weather or not the user typed a response
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		name: "stockQuantity",
		type: "input",
		message: "How many would you like to buy?",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
		} else {
			return false;
		}
	}

	}]).then(function(answer) {
		// console.log(answer.stockQuantity);
// * -- Once the customer has placed the order: Your application should...
  // * Check if your store has enough quantity of the product to meet the customer's request.
  //   If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.
  // * If your store DOES have enough of the product to meet the customer's request, you should fulfill their order.
  //   This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity. --

  	var query = "SELECT * FROM products WHERE item_id=" + answer.stockQuantity;
  	// console.log(answer.stockQuantity);
  	connection.query(query, function(err, res) {
  		// console.log(res);
  		if (answer.stockQuantity <= res) {
  			for (var i = 0; i < res.length; i++) {
  				console.log("We currently have " + res[i].stockQuantity + " " + res[i].productName);
  				console.log("Thank you for your business!" + "Your order of " + res[i].stockQuantity + " " + res[i].productName + " " + res[i].price + " is now being processed.");
  			}
  		} else {
  			console.log("\n");
  			console.log("\x1b[45m%s\x1b[0m", "Not enough of this product in stock.");
  			console.log("\n");
  		}
  			// displayProducts();
  		})
	})
}










