USE session06;

-- Tạo bảng 
CREATE TABLE customers(
customer_id INT PRIMARY KEY,
customer_name VARCHAR(150)
);

CREATE TABLE orders(
order_id INT PRIMARY KEY,
order_date DATE,
customer_id INT,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Tạo view
CREATE VIEW v_order_info AS
SELECT
    o.order_id,
    o.order_date,
    c.customer_name
FROM orders o
JOIN customers c
    ON o.customer_id = c.customer_id;

-- Nhân viên chỉ cần 
SELECT * FROM v_order_info;