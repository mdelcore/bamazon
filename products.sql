DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	productName VARCHAR(30) NOT NULL, 
	departmentName VARCHAR(30) NOT NULL,
	price DECIMAL(10, 2) NULL,
	stockQuantity INT(15),
	PRIMARY KEY (item_id)
);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("shampoo", "Beauty", 14.99, 100);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Leggings", "Clothing", 24.99, 10);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Fish Oil", "Supplements", 29.99, 230);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Big Magic", "Books", 12.00, 59);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Yoga Mat", "Fitness", 18.50, 5);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("iPhone X", "Electronics", 999.99, 400);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Gas Grill", "Outdoor", 299.99, 39);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Pillow", "Bedding", 19.99, 159);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("Bike", "Fitness", 499.99, 25);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUE ("MacBook Pro", "Electronics", 1499.99, 10);


SELECT * FROM products