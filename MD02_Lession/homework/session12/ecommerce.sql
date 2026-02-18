CREATE SCHEMA ecommerce;
USE ecommerce;

-- [Bài tập] Luyện tập các loại Trigger với CSDL Ecommerce
-- 1. Bảng customers (Khách hàng)
CREATE TABLE customers(
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

-- 2. Bảng orders (Đơn hàng)
CREATE TABLE orders(
	order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) DEFAULT 0,
    order_status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 3. Bảng products (Sản phẩm)
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    product_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng order_items (Chi tiết đơn hàng)
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 5. Bảng inventory (Kho hàng)
CREATE TABLE inventory (
    product_id INT PRIMARY KEY,
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- 6. Bảng payments (Thanh toán)
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash') NOT NULL,
    payment_status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- Trigger BEFORE INSERT: kiểm tra số lượng tồn kho trước khi thêm sản phẩm vào order_items
DELIMITER //

CREATE TRIGGER trg_before_insert_order_items
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
	DECLARE current_stock INT;
    
    SELECT stock_quantity
    INTO current_stock
    FROM inventory
    WHERE product_id = NEW.product_id;
    
    IF current_stock IS NULL THEN
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không tìm thấy sản phẩm trong kho';
	END IF;
    
    IF current_stock < NEW.quantity THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Số lượng sản phẩm trong kho không đủ';
    END IF;
END //

DELIMITER ;

-- Trigger AFTER INSERT: cập nhật total_amount trong bảng orders sau khi thêm một sản phẩm mới vào order_items
DELIMITER //

CREATE TRIGGER trg_after_insert_order_items
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
	-- Trừ kho 
    SET SQL_SAFE_UPDATES = 0;
    UPDATE inventory
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE product_id = NEW.product_id;
    
    -- Cập nhật tổng tiền
    SET SQL_SAFE_UPDATES = 0;
    UPDATE orders
    SET total_amount = (
		SELECT SUM(quantity * price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
END //

DELIMITER ;	

-- Trigger BEFORE UPDATE: kiểm tra số lượng tồn kho trước khi cập nhật số lượng sản phẩm trong order_items 
DELIMITER //

CREATE TRIGGER trg_before_update_order_items
BEFORE UPDATE ON order_items
FOR EACH ROW
BEGIN
	DECLARE current_stock INT;
    DECLARE quantity_diff INT;
    
    SET quantity_diff = NEW.quantity - OLD.quantity;
    
    IF quantity_diff > 0 THEN
		SELECT stock_quantity
        INTO current_stock
        FROM inventory
        WHERE product_id = NEW.product_id;
        
        IF current_stock < quantity_diff THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Số lượng tồn kho không đủ để cập nhật';
        END IF;
	END IF;
    
END // 

DELIMITER ;

-- Trigger AFTER UPDATE: cập nhật lại total_amount trong bảng orders khi số lượng hoặc giá của một sản phẩm trong order_items thay đổi
DELIMITER //

CREATE TRIGGER trg_after_update_order_item
AFTER UPDATE ON order_items
FOR EACH ROW 
BEGIN
	DECLARE quantity_diff INT;
    
    SET quantity_diff = NEW.quantity - OLD.quantity;
    
    -- Điều chỉnh kho 
    SET SQL_SAFE_UPDATES = 0;
    UPDATE inventory
    SET stock_quantity = stock_quantity - quantity_diff
    WHERE product_id = NEW.product_id;
    
    -- Cập nhật tổng tiền
    SET SQL_SAFE_UPDATES = 0;
    UPDATE orders
    SET total_amount = (
		SELECT SUM(quantity * price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEw.order_id;
    
END //

DELIMITER ;
 
-- Trigger BEFORE DELETE: ngăn chặn việc xóa một đơn hàng có trạng thái Completed trong bảng orders
DELIMITER //

CREATE TRIGGER trg_before_delete_orders
BEFORE DELETE ON orders
FOR EACH ROW
BEGIN
	IF OLD.order_status = 'Completed' THEN
    SIGNAL SQLSTATE '45000'
	SET MESSAGE_TEXT = 'Không thể xóa đơn hàng đã hoàn thành';
    END IF;
END //

DELIMITER ;

-- Trigger AFTER DELETE: hoàn trả số lượng sản phẩm vào kho (inventory) sau khi một sản phẩm trong order_items bị xóa.
DELIMITER //

CREATE TRIGGER trg_after_delete_order_items
AFTER DELETE ON order_items
FOR EACH ROW
BEGIN
	-- Cộng lại kho
    SET SQL_SAFE_UPDATES = 0;
    UPDATE inventory
    SET stock_quantity = stock_quantity + OLD.quantity
    WHERE product_id = OLD.product_id;
    
    -- Cập nhật lại tổng tiền
    SET SQL_SAFE_UPDATES = 0;
    UPDATE orders
    SET total_amount = IFNULL((
		SELECT SUM(quantity * price)
        FROM order_items
        WHERE order_id = OLD.order_id
    ),0) 
	WHERE order_id = OLD.order_id;
END //

DELIMITER ; 

-- Xóa tất cả Trigger
DROP TRIGGER IF EXISTS trg_before_insert_order_items;
DROP TRIGGER IF EXISTS trg_after_insert_order_items;
DROP TRIGGER IF EXISTS trg_before_update_order_items;
DROP TRIGGER IF EXISTS trg_after_update_order_items;
DROP TRIGGER IF EXISTS trg_before_delete_orders;
DROP TRIGGER IF EXISTS trg_after_delete_order_items;
