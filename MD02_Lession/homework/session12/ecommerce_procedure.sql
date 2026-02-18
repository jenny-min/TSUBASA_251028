USE ecommerce;

-- [Bài tập] Luyện tập các thao tác Transaction
-- Stored Procedure: sp_create_order
DELIMITER $$

CREATE PROCEDURE sp_create_order(
    IN p_customer_id INT,
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_price DECIMAL(10,2)
)
BEGIN
    DECLARE v_stock INT;
    DECLARE v_order_id INT;

    -- Bắt lỗi SQL
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Kiểm tra tồn kho
    SELECT stock_quantity INTO v_stock
    FROM inventory
    WHERE product_id = p_product_id
    FOR UPDATE;

    IF v_stock IS NULL OR v_stock < p_quantity THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không đủ số lượng tồn kho';
    ELSE
        
        -- Tạo đơn hàng
        INSERT INTO orders(customer_id, total_amount, order_status)
        VALUES (p_customer_id, p_quantity * p_price, 'Pending');

        SET v_order_id = LAST_INSERT_ID();

        -- Thêm chi tiết đơn hàng
        INSERT INTO order_items(order_id, product_id, quantity, price)
        VALUES (v_order_id, p_product_id, p_quantity, p_price);

        -- Trừ tồn kho
        UPDATE inventory
        SET stock_quantity = stock_quantity - p_quantity
        WHERE product_id = p_product_id;

        COMMIT;
    END IF;

END$$

DELIMITER ;

-- Stored Procedure: sp_pay_order
DELIMITER $$

CREATE PROCEDURE sp_pay_order(
    IN p_order_id INT,
    IN p_payment_method ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash')
)
BEGIN
    DECLARE v_status VARCHAR(20);
    DECLARE v_amount DECIMAL(10,2);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Lấy trạng thái và số tiền
    SELECT order_status, total_amount 
    INTO v_status, v_amount
    FROM orders
    WHERE order_id = p_order_id
    FOR UPDATE;

    IF v_status IS NULL OR v_status <> 'Pending' THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Đơn hàng không hợp lệ để thanh toán';
    ELSE
        
        -- Thêm thanh toán
        INSERT INTO payments(order_id, amount, payment_method, payment_status)
        VALUES (p_order_id, v_amount, p_payment_method, 'Completed');

        -- Cập nhật trạng thái đơn hàng
        UPDATE orders
        SET order_status = 'Completed'
        WHERE order_id = p_order_id;

        COMMIT;
    END IF;

END$$

DELIMITER ;

-- Stored Procedure: sp_cancel_order
DELIMITER $$

CREATE PROCEDURE sp_cancel_order(
    IN p_order_id INT
)
BEGIN
    DECLARE v_status VARCHAR(20);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Kiểm tra trạng thái đơn hàng
    SELECT order_status 
    INTO v_status
    FROM orders
    WHERE order_id = p_order_id
    FOR UPDATE;

    IF v_status IS NULL OR v_status <> 'Pending' THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Đơn hàng không thể hủy';
    ELSE
        
        -- Hoàn lại tồn kho
        UPDATE inventory i
        JOIN order_items oi ON i.product_id = oi.product_id
        SET i.stock_quantity = i.stock_quantity + oi.quantity
        WHERE oi.order_id = p_order_id;

        -- Xóa chi tiết đơn hàng
        DELETE FROM order_items
        WHERE order_id = p_order_id;

        -- Cập nhật trạng thái
        UPDATE orders
        SET order_status = 'Cancelled'
        WHERE order_id = p_order_id;

        COMMIT;
    END IF;

END$$

DELIMITER ;

-- Xóa tất cả Stored Procedure
DROP PROCEDURE IF EXISTS sp_create_order;
DROP PROCEDURE IF EXISTS sp_pay_order;
DROP PROCEDURE IF EXISTS sp_cancel_order;
 