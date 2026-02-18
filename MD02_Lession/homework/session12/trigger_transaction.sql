USE ecommerce;

-- [Bài tập] Luyện tập thao tác với Trigger và Transaction
-- Tạo bảng order_logs
CREATE TABLE order_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    old_status ENUM('Pending', 'Completed', 'Cancelled'),
    new_status ENUM('Pending', 'Completed', 'Cancelled'),
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- Trigger BEFORE INSERT – Kiểm tra số tiền thanh toán
DELIMITER $$

CREATE TRIGGER before_insert_check_payment
BEFORE INSERT ON payments
FOR EACH ROW
BEGIN
    DECLARE order_total DECIMAL(10,2);

    -- Lấy tổng tiền đơn hàng
    SELECT total_amount
    INTO order_total
    FROM orders
    WHERE order_id = NEW.order_id;

    -- Nếu không khớp thì báo lỗi
    IF NEW.amount <> order_total THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Payment amount does not match order total amount';
    END IF;
END$$

DELIMITER ;

-- Trigger AFTER UPDATE – Ghi log khi đổi trạng thái
DELIMITER $$

CREATE TRIGGER after_update_order_status
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF OLD.order_status <> NEW.order_status THEN
        INSERT INTO order_logs(order_id, old_status, new_status)
        VALUES (OLD.order_id, OLD.order_status, NEW.order_status);
    END IF;
END$$

DELIMITER ;

-- Stored Procedure + Transaction
DELIMITER $$

CREATE PROCEDURE sp_update_order_status_with_payment(
    IN p_order_id INT,
    IN p_new_status ENUM('Pending', 'Completed', 'Cancelled'),
    IN p_payment_amount DECIMAL(10,2),
    IN p_payment_method ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash')
)
BEGIN
    DECLARE current_status ENUM('Pending', 'Completed', 'Cancelled');

    -- Bắt lỗi và rollback
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Transaction rolled back due to error' AS message;
    END;

    START TRANSACTION;

    -- Lấy trạng thái hiện tại
    SELECT order_status
    INTO current_status
    FROM orders
    WHERE order_id = p_order_id
    FOR UPDATE;

    -- Nếu trạng thái giống nhau → lỗi
    IF current_status = p_new_status THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order status is already the same';
    END IF;

    -- Nếu chuyển sang Completed
    IF p_new_status = 'Completed' THEN

        -- Thêm payment (Trigger sẽ kiểm tra số tiền)
        INSERT INTO payments(order_id, amount, payment_method, payment_status)
        VALUES (p_order_id, p_payment_amount, p_payment_method, 'Completed');

    END IF;

    -- Cập nhật trạng thái đơn hàng
    UPDATE orders
    SET order_status = p_new_status
    WHERE order_id = p_order_id;

    COMMIT;

    SELECT 'Transaction completed successfully' AS message;

END$$

DELIMITER ;

-- Kiểm tra hoạt động
-- Thêm dữ liệu test
-- Thêm customer
INSERT INTO customers(customer_name, email)
VALUES ('Nguyen Van A', 'a@gmail.com');

-- Thêm product
INSERT INTO products(product_name, price)
VALUES ('Laptop', 1000);

-- Thêm inventory
INSERT INTO inventory(product_id, stock_quantity)
VALUES (1, 10);

-- Thêm order
INSERT INTO orders(customer_id, total_amount)
VALUES (1, 1000);

-- Trường hợp thành công
CALL sp_update_order_status_with_payment(
    1,
    'Completed',
    1000,
    'Credit Card'
);

-- Trường hợp thất bại (sai số tiền)
CALL sp_update_order_status_with_payment(
    1,
    'Completed',
    500,
    'Credit Card'
);

-- Xem logs
SELECT * FROM order_logs;

-- Xóa Trigger và Procedure
DROP TRIGGER IF EXISTS before_insert_check_payment;
DROP TRIGGER IF EXISTS after_update_order_status;
DROP PROCEDURE IF EXISTS sp_update_order_status_with_payment;
           