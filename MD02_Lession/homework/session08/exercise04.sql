-- [Bài tập] Stored Procedure có câu lệnh điều kiện IF
-- Tạo bảng
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY, 
    total_amount DECIMAL(15,2) NOT NULL      
);

-- Stored Procedure có tên sp_check_order_value
DELIMITER $$

CREATE PROCEDURE sp_check_order_value(IN p_total DECIMAL(15,2))
BEGIN
    IF p_total >= 5000000 THEN
        SELECT 'Đơn hàng giá trị cao' AS message;
    ELSE
        SELECT 'Đơn hàng bình thường' AS message;
    END IF;
END $$

DELIMITER ;

-- Gọi procedure
CALL sp_check_order_value(6000000);
 