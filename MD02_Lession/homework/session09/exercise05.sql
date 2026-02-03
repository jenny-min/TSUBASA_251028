-- [Bài tập] Báo cáo doanh thu theo khách hàng (View phức tạp)
-- Tạo bảng
CREATE TABLE orders (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_amount DECIMAL(15,2) NOT NULL CHECK (total_amount > 0),
	status ENUM('Pending', 'Success', 'Cancel') DEFAULT 'Pending',
	FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) 
); 

-- Thêm 20 bản ghi vào bảng
INSERT INTO orders (customer_id, product_id, quantity, total_amount, status) VALUES
(1, 1, 1, 15000000, 'Success'),
(1, 2, 1, 18000000, 'Success'),
(2, 3, 1, 22000000, 'Success'),
(2, 6, 2, 1000000, 'Pending'),
(3, 4, 1, 25000000, 'Success'),

(3, 7, 1, 1800000, 'Success'),
(4, 8, 2, 7000000, 'Success'),
(4, 9, 1, 6200000, 'Cancel'),
(5, 10, 1, 2800000, 'Success'),
(5, 11, 2, 3800000, 'Success'),

(6, 12, 1, 3200000, 'Pending'),
(6, 13, 2, 3200000, 'Success'),
(7, 14, 1, 3200000, 'Success'),
(7, 15, 1, 9500000, 'Success'),
(8, 16, 1, 4200000, 'Success'),

(9, 17, 1, 3800000, 'Cancel'),
(9, 18, 2, 2400000, 'Success'),
(10, 19, 1, 2100000, 'Success'),
(10, 20, 1, 2900000, 'Pending'),
(1, 5, 1, 42000000, 'Success');

-- Tạo view
CREATE VIEW view_customer_spending AS
SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status = 'Success'
GROUP BY c.customer_id, c.customer_name;  

-- Kiểm tra dữ liệu từ view
SELECT * FROM view_customer_spending; 