-- [Bài tập] Xử lý Đặt hàng Online (Transaction & Procedure)

-- Tạo bảng products
CREATE TABLE products(
	product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
); 

-- Tạo bảng orders
CREATE TABLE orders(
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2),
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
); 

-- Thêm dữ liệu "Laptop Gaming" giá 20.000.000, tồn kho 10 chiếc
INSERT INTO products (product_name, price, stock) 
VALUES ('Laptop Gaming', 20000000, 10);

-- Tạo Stored Procedure place_order
DELIMITER $$

CREATE PROCEDURE place_order(
	IN p_product_id INT,
    IN p_quantity INT
)

BEGIN
	-- Khai báo biến 
	DECLARE v_stock INT;
    DECLARE v_price DECIMAL(10, 2);
	
    -- Khai báo Handler: Gặp lỗi hệ thống thì Rollback ngay
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		
	BEGIN
		ROLLBACK;
		SELECT 'Lỗi hệ thống! Đặt hàng thất bại.' AS message;
    END;
	
    -- Bắt đầu Transaction 
	START TRANSACTION;
    
    -- 1. Lấy thông tin tồn kho và giá hiện tại
    SELECT stock, price INTO v_stock, v_price
    FROM products 
    WHERE product_id = p_product_id 
    FOR UPDATE;
    
    -- Kiểm tra tồn kho
    IF v_stock < p_quantity THEN
        ROLLBACK;
        SELECT 'Số lượng hàng không đủ' AS message;
    ELSE
        -- Trừ tồn kho
        SET SQL_SAFE_UPDATES = 0;
        UPDATE products
        SET stock = stock - p_quantity
        WHERE product_id = p_product_id;

        -- Tạo đơn hàng
        INSERT INTO orders (product_id, quantity, total_price)
        VALUES (p_product_id, p_quantity, v_price * p_quantity);

        COMMIT;
        SELECT 'Đặt hàng thành công' AS message;
    END IF;
    
END $$
DELIMITER ; 

-- Kiểm thử
-- TH1: Thành công, mua 2 chiếc Laptop 
CALL place_order(1, 2);

-- Kiểm tra kho còn lại
SELECT product_id, stock FROM products WHERE product_id = 1;

-- TH2: Thất bại, mua 20 chiếc Laptop (vượt tồn kho) 
CALL place_order(1, 20);

-- Kiểm tra kho
SELECT product_id, stock FROM products WHERE product_id = 1;

-- Kiểm tra đơn hàng mới
SELECT * FROM orders WHERE product_id = 1;