CREATE SCHEMA session10;

USE session10;

-- [Bài tập] Ghi lại thay đổi số lượng sản phẩm
-- Tạo bảng
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    quantity INT
);

CREATE TABLE InventoryChanges (
    change_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    old_quantity INT,
    new_quantity INT,
    change_date DATETIME
);

-- Tạo trigger
DELIMITER $$

CREATE TRIGGER AfterProductUpdate
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
    IF OLD.quantity <> NEW.quantity THEN
        INSERT INTO InventoryChanges (
            product_id,
            old_quantity,
            new_quantity,
            change_date
        )
        VALUES (
            OLD.product_id,
            OLD.quantity,
            NEW.quantity,
            NOW()
        );
    END IF;
END $$

DELIMITER ;

-- Thêm dữ liệu
INSERT INTO products (product_name, quantity) VALUES
('Bàn phím', 50),
('Chuột không dây', 100),
('Màn hình LCD', 30);

-- Thêm sản phẩm
INSERT INTO Products(product_name, quantity)
VALUES ('Bàn phím', 50);

-- Cập nhật số lượng
SET SQL_SAFE_UPDATES = 0;
UPDATE Products
SET quantity = 40
WHERE product_name = 'Màn hình LCD';

-- Xem lịch sử thay đổi
SELECT * FROM InventoryChanges;
   