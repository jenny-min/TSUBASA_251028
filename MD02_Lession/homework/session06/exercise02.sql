-- Quản lý Khách hàng & Đơn hàng
-- Bảng customers
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

-- Bảng orders
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Bảng order_details
CREATE TABLE order_details (
    order_detail_id INT PRIMARY KEY,
    order_id INT,
    product_name VARCHAR(100),
    quantity INT,
    price DECIMAL(15,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Thêm dữ liệu
INSERT INTO customers (customer_id, customer_name)
VALUES
(201, 'Nguyễn Văn A'),
(202, 'Trần Thị B'),
(203, 'Lê Văn C'),
(204, 'Phạm Thị D'),
(205, 'Hoàng Văn E'); 

INSERT INTO orders (order_id, customer_id, order_date)
VALUES
(301, 201, '2026-01-10'),
(302, 201, '2026-01-12'),
(303, 202, '2026-01-11'),
(304, 203, '2026-01-15'),
(305, 203, '2026-01-20');

INSERT INTO order_details (order_detail_id, order_id, product_name, quantity, price)
VALUES
(401, 301, 'Laptop Dell', 1, 25000000),
(402, 301, 'Chuột Logitech', 2, 500000),
(403, 302, 'Điện thoại Samsung', 1, 12000000),
(404, 303, 'Máy tính HP', 1, 20000000),
(405, 304, 'Tai nghe Sony', 2, 2000000),
(406, 305, 'Bàn phím cơ', 1, 1500000),
(407, 305, 'Màn hình LG', 1, 7000000);

-- Liệt kê những khách hàng đã có ít nhất một đơn hàng
SELECT DISTINCT c.customer_id, c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;
 
-- Tìm những khách hàng chưa từng đặt đơn hàng nào
SELECT c.customer_id, c.customer_name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Tính toán tổng doanh thu mà mỗi khách hàng đã mang lại
SELECT c.customer_id, c.customer_name,
       SUM(od.quantity * od.price) AS total_revenue
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_details od ON o.order_id = od.order_id
GROUP BY c.customer_id, c.customer_name;

-- Xác định khách hàng đã mua sản phẩm có giá cao nhất
SELECT c.customer_id, c.customer_name, od.product_name, od.price
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_details od ON o.order_id = od.order_id
WHERE od.price = (
    SELECT MAX(price) FROM order_details
);