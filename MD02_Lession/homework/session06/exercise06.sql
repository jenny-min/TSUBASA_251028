-- Index phục vụ tìm kiếm theo nhiều điều kiện
USE session06; 

-- Tạo bảng
CREATE TABLE orders_idx(
order_id INT PRIMARY KEY,
order_date DATE, 
order_status VARCHAR(50),
total_amount DECIMAL(15,2)
); 

-- Tạo INDEX
CREATE INDEX idx_orders_order_date_order_status
ON orders_idx(order_date, order_status);