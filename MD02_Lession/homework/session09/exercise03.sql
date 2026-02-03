-- [Bài tập] Thủ tục lấy về danh sách sản phẩm giá cao
-- Tạo bảng
CREATE TABLE products(
	product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    price DECIMAL(15,2) NOT NULL CHECK (price > 0),
    stock INT NOT NULL CHECK (stock > 0)
);  

-- Thêm 20 bản ghi vào bảng products
 INSERT INTO products (product_name, price, stock) VALUES
('Laptop Dell Inspiron', 15000000, 10),
('Laptop HP Pavilion', 18000000, 8),
('Laptop Lenovo ThinkPad', 22000000, 5),
('MacBook Air M1', 25000000, 6),
('MacBook Pro M2', 42000000, 4),

('Chuột Logitech', 500000, 50),
('Bàn phím cơ Keychron', 1800000, 30),
('Màn hình LG 24 inch', 3500000, 12),
('Màn hình Samsung 27 inch', 6200000, 7),
('Tai nghe Sony', 2800000, 20),

('Ổ cứng SSD 512GB', 1900000, 25),
('Ổ cứng SSD 1TB', 3200000, 15),
('RAM DDR4 16GB', 1600000, 40),
('RAM DDR4 32GB', 3200000, 18),
('Card đồ họa RTX 3060', 9500000, 3),

('Máy in HP', 4200000, 6),
('Máy scan Canon', 3800000, 5),
('Router Wifi TP-Link', 1200000, 22),
('Switch mạng 16 port', 2100000, 10),
('UPS Santak', 2900000, 9);

-- Tạo Stored Procedure get_high_value_products
DELIMITER $$

CREATE PROCEDURE get_high_value_products()
BEGIN
    SELECT product_id, product_name, price, stock
    FROM products
    WHERE price > 1000000;
END $$

DELIMITER ;
 
-- Gọi Stored Procedure để kiểm tra kết quả
CALL get_high_value_products();