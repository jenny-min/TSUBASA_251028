-- [Bài tập] Thủ tục thêm mới khách hàng (Store Procedure)
DELIMITER $$

CREATE PROCEDURE insert_customer(
    IN in_customer_name VARCHAR(50),
    IN in_email VARCHAR(100),
    IN in_phone VARCHAR(15),
    IN in_address VARCHAR(255)
)
BEGIN
    INSERT INTO customers (customer_name, email, phone, address)
    VALUES (in_customer_name, in_email, in_phone, in_address);

    SELECT 'Thêm mới khách hàng thành công' AS message;
END $$

DELIMITER ;

-- Gọi Stored Procedure để thêm khách hàng mới 
CALL insert_customer(
    'Nguyen Thi Hoa',
    'hoa.nguyen@gmail.com',
    '0987654321',
    'Ho Chi Minh City'
);

-- Kiểm tra dữ liệu đã được thêm
SELECT * 
FROM customers
WHERE email = 'hoa.nguyen@gmail.com';
