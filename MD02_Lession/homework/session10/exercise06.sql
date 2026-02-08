-- [Bài tập] Kiểm Tra Tồn Kho Trước Khi Thêm Vào Giỏ Hàng
-- Tạo bảng cart_items
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity INT,
    CONSTRAINT fk_cart_items_products
        FOREIGN KEY (product_id) REFERENCES products(product_id)
);
DROP TRIGGER before_cart_add;
-- Tạo trigger before_cart_add
DELIMITER $$

CREATE TRIGGER before_cart_add
BEFORE INSERT ON cart_items
FOR EACH ROW

BEGIN
	-- Khai báo biến
    DECLARE stock_quantity INT;
    
    -- Lấy số lượng tồn kho của sản phẩm
    SELECT quantity
    INTO stock_quantity
    FROM products
    WHERE product_id = NEW.product_id;
    
    -- Kiểm tra tồn kho
    IF NEW.quantity > stock_quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Số lượng hàng trong kho không đủ';
    END IF;

END $$ 

DELIMITER ;

-- Kiểm thử
-- Tạo sản phẩm mẫu
INSERT INTO products (product_name, quantity)
VALUES ('iPhone 15', 5);

-- TH1: Thêm số lượng hợp lệ (2 cái)
INSERT INTO cart_items (product_id, quantity)
VALUES (12, 2);
 
SELECT * FROM cart_items;

-- TH2: Thêm số lượng không hợp lệ (10 cái)
INSERT INTO cart_items (product_id, quantity)
VALUES (12, 10);