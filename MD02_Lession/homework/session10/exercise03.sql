-- [Bài tập] Tự động kiểm tra số lượng sản phẩm trước khi insert
-- Tạo trigger
DELIMITER $$

CREATE TRIGGER BeforeInsertProduct
BEFORE INSERT ON Products
FOR EACH ROW
BEGIN
    IF NEW.quantity < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Số lượng sản phẩm không được nhỏ hơn 0!';
    END IF;
END $$

DELIMITER ;
 
-- Chèn sản phẩm hợp lệ
INSERT INTO Products (product_name, quantity) VALUES ('Iphone 17', 10);

-- Chèn sản phẩm với quantity < 0 -> sẽ bị lỗi và không chèn được
INSERT INTO Products (product_name, quantity) VALUES ('Iphone 17', -5);
