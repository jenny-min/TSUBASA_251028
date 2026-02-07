-- [Bài tập] Thủ Tục Thêm Mới Đơn Hàng

-- Tạo bảng order_details
CREATE TABLE order_details(
    order_id INT,
    product_id INT,
    quantity INT
); 

-- Tạo Stored Procedure có tên add_order
DELIMITER $$

CREATE PROCEDURE add_order (
	IN _customer_id INT,
    IN _product_id INT,
    IN _quantity INT,
    OUT _message VARCHAR(255)
)

BEGIN
	-- Khởi tạo biến để add order 
	DECLARE current_stock INT;
    DECLARE new_order_id INT;
	
    -- Lấy số lượng tồn kho sản phẩm
    SELECT stock
    INTO current_stock
    FROM products
    WHERE product_id = _product_id;
    
    -- Kiểm tra tồn kho
    IF current_stock IS NULL THEN
    SET _message = 'Sản phểm không tồn tại!';
    
    ELSEIF current_stock < _quantity THEN
    SET _message = 'Không đủ số lượng sản phẩm để đặt hàng.';
    
    ELSE 
    -- Tạo đơn hàng mới 
    INSERT INTO orders(customer_id)
	VALUES (_customer_id);
	
    -- Lấy order_id vừa tạo
	SET new_order_id = LAST_INSERT_ID();
        
	-- Thêm chi tiết đơn hàng
	INSERT INTO order_details(order_id, product_id, quantity)
	VALUES (new_order_id, _product_id, _quantity);
        
  -- Trừ tồn kho
        UPDATE products
        SET stock = stock - _quantity
        WHERE product_id = _product_id;

        SET _message = 'Thêm đơn hàng thành công!';
    END IF;
    
END $$

DELIMITER ;

-- Gọi procedure và nhận outparameter
CALL add_order(1, 2, 500, @result_message);
SELECT @result_message;

 