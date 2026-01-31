USE session05;
-- Tạo bảng -- 
CREATE TABLE customers(
customer_id INT PRIMARY KEY,
customer_name VARCHAR(100) 
);

CREATE TABLE orders(
order_id INT PRIMARY KEY,
order_date DATE,
customer_id INT,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items(
order_item_id INT PRIMARY KEY,
order_id INT,
customer_id INT,
product_name VARCHAR(100),
quantity INT,
price DECIMAL(20,2),
FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Thêm dữ liệu vào bảng --  
INSERT INTO customers (customer_id, customer_name) VALUES
(1, 'Nguyễn Văn A'),
(2, 'Trần Thị B'),
(3, 'Lê Văn C'),
(4, 'Phạm Thị D');

INSERT INTO orders (order_id, order_date, customer_id) VALUES
(101, '2024-01-10', 1),
(102, '2024-01-15', 1),
(103, '2024-02-01', 2),
(104, '2024-02-10', 3),
(105, '2024-03-05', 4);

INSERT INTO order_items
(order_item_id, order_id, customer_id, product_name, quantity, price)
VALUES
-- Đơn 101 – Nguyễn Văn A
(1, 101, 1, 'Laptop', 1, 15000000),
(2, 101, 1, 'Chuột', 2, 300000),

-- Đơn 102 – Nguyễn Văn A
(3, 102, 1, 'Điện thoại', 1, 12000000),

-- Đơn 103 – Trần Thị B
(4, 103, 2, 'TV', 1, 18000000),
(5, 103, 2, 'Loa', 1, 3000000),

-- Đơn 104 – Lê Văn C
(6, 104, 3, 'Máy giặt', 1, 9000000),

-- Đơn 105 – Phạm Thị D
(7, 105, 4, 'Tủ lạnh', 1, 22000000);

SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM order_items;

-- Hiển thị mã đơn hàng, tên khách hàng, tổng tiền của đơn hàng -- 
SELECT o.order_id,
c.customer_name,
SUM(oi.quantity * oi.price) AS total_order_amount
FROM orders o
JOIN customers c
ON o.customer_id = c.customer_id
JOIN order_items oi
ON o.order_id = oi.order_id
GROUP BY 
o.order_id,
c.customer_name;

-- Tính tổng doanh thu của mỗi khách hàng --  
SELECT o.order_id,
c.customer_name,
SUM(oi.quantity * oi.price) AS total_revenue
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN order_items oi
ON o.order_id = oi.order_id
GROUP BY 
o.order_id,
c.customer_name;

-- Chỉ hiển thị các khách hàng có tổng doanh thu > 20.000.000 -- 
SELECT o.order_id,
c.customer_name,
SUM(oi.quantity * oi.price) AS total_revenue
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN order_items oi
ON o.order_id = oi.order_id
GROUP BY 
o.order_id,
c.customer_name
HAVING SUM(oi.quantity * oi.price) > 20000000;

-- Hiển thị khách hàng có doanh thu cao nhất -- 
SELECT o.order_id,
c.customer_name,
SUM(oi.quantity * oi.price) AS total_revenue
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
JOIN order_items oi
ON o.order_id = oi.order_id
GROUP BY 
o.order_id,
c.customer_name
ORDER BY 
total_revenue DESC
LIMIT 1;