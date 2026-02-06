USE session08;

-- [Bài tập] Stored Procedure có tham số in
-- Tạo bảng
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,   
    product_name VARCHAR(100) NOT NULL,          
    price DECIMAL(15,2) NOT NULL,               
    category VARCHAR(50) NOT NULL               
);
 
-- Tạo Stored Procedure
DELIMITER $$

CREATE PROCEDURE sp_get_products_by_category(IN p_category VARCHAR(50))
BEGIN
    SELECT
        product_id,
        product_name,
        price,
        category
    FROM products
    WHERE category = p_category;
END $$

DELIMITER ;

-- Gọi Procedure với giá trị cụ thể
CALL sp_get_products_by_category('Laptop');
   