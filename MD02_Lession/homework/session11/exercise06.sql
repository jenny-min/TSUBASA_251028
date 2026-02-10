-- [Bài tập] Hủy Đơn Hàng & Hoàn Tồn Kho (Order Cancellation)

-- Cập nhật bảng orders để có cột trạng thái
ALTER TABLE orders
ADD COLUMN order_status VARCHAR(20) DEFAULT 'Completed';

-- Tạo Stored Procedure cancel_order
DELIMITER $$

CREATE PROCEDURE cancel_order (
    IN p_order_id INT
)
BEGIN
    DECLARE v_product_id INT;
    DECLARE v_quantity INT;
    DECLARE v_status VARCHAR(20);

    -- Bắt lỗi SQL bất ngờ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Hệ thống lỗi! Hủy đơn hàng thất bại' AS message;
    END;

    -- Kiểm tra đơn hàng
    SELECT product_id, quantity, status
    INTO v_product_id, v_quantity, v_status
    FROM orders
    WHERE order_id = p_order_id;

    IF v_status = 'Cancelled' THEN
        SELECT 'Đơn hàng đã bị hủy trước đó' AS message;
    ELSE
        START TRANSACTION;

        -- Bước 1: Cập nhật trạng thái đơn hàng
        UPDATE orders
        SET status = 'Cancelled'
        WHERE order_id = p_order_id;

        -- Bước 2: Cộng lại tồn kho
        UPDATE products
        SET stock = stock + v_quantity
        WHERE product_id = v_product_id;

        COMMIT;
        SELECT 'Hủy đơn hàng thành công' AS message;
    END IF;

END$$

DELIMITER ;

-- Kiểm thử
-- Bước 1: Tạo đơn hàng mới, mua 2 Laptop (id = 1)
CALL place_order(1, 2);

-- Kiểm tra kho
SELECT product_id, stock FROM products WHERE product_id = 1;

-- Kiểm tra đơn hàng mới
SELECT * FROM orders WHERE order_id = 2;

-- Bước 2: Hủy đơn hàng
CALL cancel_order(2);

-- Bước 3: Kiểm tra lại 
-- Kiểm tra kho
SELECT product_id, stock FROM products WHERE product_id = 1;

-- Kiểm tra trạng thái đơn hàng
SELECT order_id, order_status FROM orders WHERE order_id = 2;    