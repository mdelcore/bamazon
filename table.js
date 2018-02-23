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
  	displayProducts();
})

// * -- display all items for sale
var displayProducts = function() {
	var table = new Table ({
		head: ["Item ID", "Product Name", "Department", "Cost", "Stock"],
		colWidths: [10, 25, 20, 8 ,8]
	});
	var query = "SELECT * FROM products"
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++) {
			table.push([res[i].item_id, res[i].productName,res[i].departmentName, res[i].price, res[i].stock_quantity]);
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
		name: "stock_quantity",
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
        return new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM products WHERE ?', { item_id: answer.item }, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
            // Then if selected quanitity is valid, save to a local object, else console log error
        }).then(function(result) {
            var savedData = {};

            if (parseInt(answer.quantity) <= parseInt(result[0].stock_quantity)) {
                savedData.answer = answer;
                savedData.result = result;
            } else if (parseInt(answer.quantity) > parseInt(result[0].stock_quantity)) {
                console.log('Insufficient quantity!');
            } else {
                console.log('An error occurred, exiting Bamazon, your order is not complete.');
            }
            
            return savedData;
            // Update the SQL DB and console log messages for completion.
        }).then(function(savedData) {
            if (savedData.answer) {
                var updatedQuantity = parseInt(savedData.result[0].stock_quantity) - parseInt(savedData.answer.quantity);
                var itemId = savedData.answer.item;
                var totalCost = parseInt(savedData.result[0].price) * parseInt(savedData.answer.quantity);
                connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: updatedQuantity
                }, {
                    item_id: itemId
                }], function(err, res) {
                    if (err) throw err;
                    console.log('Your order total cost $' + totalCost + '. Thank you for shopping with Bamazon!');
                    connection.destroy();
                });
            } else {
                // Recursion to re-enter store
                enterStore();
            }
            // catch errors
        }).catch(function(err) {
            console.log(err);
            connection.destroy();
        });
        // catch errors
    }).catch(function(err) {
        console.log(err);
        connection.destroy();
    });
}