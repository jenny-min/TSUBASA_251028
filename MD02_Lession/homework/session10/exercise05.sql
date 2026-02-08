USE session10;

-- [Bài tập] Tạo Trigger Ghi Nhật Ký Thay Đổi Trạng Thái Đơn Hàng

-- Tạo bảng orders 
CREATE TABLE orders (
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    total_amount DECIMAL(10, 2),
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(50)
);

-- Tạo bảng order_logs 
CREATE TABLE order_logs (
	log_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_logs_orders
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
);  

-- Tạo Trigger after_order_status_update
DELIMITER $$

CREATE TRIGGER after_order_status_update
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
	-- Chỉ log khi status thay đổi
    IF OLD.order_status <> NEW.order_status THEN
		INSERT INTO order_logs(order_id, old_status, new_status)
        VALUES (OLD.order_id, OLD.order_status, NEW.order_status);
    END IF;    
END$$

DELIMITER ;

-- Kiểm thử
-- Thêm đơn hàng mới (Pending)
INSERT INTO orders (customer_name, total_amount, order_status)
VALUES ('Nguyễn Văn A', 1500000, 'Pending');

-- Update trạng thái Pending → Shipping
SET SQL_SAFE_UPDATES = 0;
UPDATE orders
SET order_status = 'Shipping'
WHERE order_id = 1;

-- Update tên khách hàng (không đổi trạng thái)
SET SQL_SAFE_UPDATES = 0;
UPDATE orders
SET customer_name = 'Nguyễn Văn B'
WHERE order_id = 1;

-- Kiểm tra kết quả
SELECT * FROM order_logs; 