CREATE TABLE products(
product_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(200),
category VARCHAR(50),
price DECIMAL(15,2),
quantity INT
);

INSERT INTO products(product_id, product_name, category, price, quantity)
VALUES (1, 'Laptop Dell Inspiron', 'Laptop', 18000000, 10),
(2, 'Laptop HP Pavilion', 'Laptop', 20000000, 8),
(3, 'iPhone 13', 'Phone', 22000000, 15),
(4, 'Chuột Logitech', 'Accessory', 500000, 50),
(5, 'Bàn phím cơ Keychron', 'Accessory', 1500000, 20);

SELECT * FROM products;

SELECT * FROM products
WHERE price BETWEEN 5000000 and 15000000;

SELECT * FROM products
WHERE category LIKE '%Laptop%';

INSERT INTO products(product_id, product_name, category, price, quantity)
VALUES (6, 'Samsung Galaxy S21', 'Phone', 14000000, 20),
(7, 'Laptop Dell Inspiron', 'Laptop', 18000000, 10),
(8, 'Laptop HP Pavilion', 'Laptop', 15000000, 5),
(9, 'Samsung Galaxy Tab A', 'Tablet', 9000000, 0),
(10, 'Chuột Logitech M331', 'Accessory', 500000, 30);

SELECT * FROM products;

SELECT * FROM products
WHERE price BETWEEN 5000000 and 15000000;

SELECT * FROM products
WHERE category IN ('Laptop', 'Tablet');

SELECT * FROM products
WHERE product_name LIKE 'Sam%';

SELECT * FROM products
WHERE NOT category = 'Phone'; 

UPDATE products
SET price = price * 0.95
WHERE category LIKE '%Laptop%';

DELETE FROM products 
WHERE quantity = 0;

SELECT * FROM products;