-- [Bài tập]  Không cho phép xóa sản phẩm theo điều kiện
USE session10;

-- Tạo trigger
DELIMITER $$

CREATE TRIGGER BeforeProductDelete
BEFORE DELETE ON Products
FOR EACH ROW
BEGIN
    IF OLD.quantity > 10 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Không thể xóa sản phẩm có số lượng lớn hơn 10!';
    END IF;
END $$

DELIMITER ;

-- Thêm dữ liệu mẫu
INSERT INTO Products (product_name, quantity) VALUES
('Sản phẩm A', 15),
('Sản phẩm B', 5),
('Sản phẩm C', 8),
('Sản phẩm D', 12),
('Sản phẩm E', 7);

-- Thử xóa sản phẩm có quantity > 10 
DELETE FROM Products WHERE product_id = 1;  

-- Xóa sản phẩm có quantity <= 10 
DELETE FROM Products WHERE product_id = 9;  