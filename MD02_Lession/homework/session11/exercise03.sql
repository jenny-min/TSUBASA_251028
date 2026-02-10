-- [Bài tập] Giao dịch Nạp tiền và Ghi lịch sử 

-- Tạo bảng transactions
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    accountID INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    log_message VARCHAR(255),
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);

-- Stored Procedure deposit_with_logging
DELIMITER $$

CREATE PROCEDURE deposit_with_logging (
    IN p_accountID INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    -- Bắt mọi lỗi SQL → rollback
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Đã xảy ra lỗi hệ thống! Giao dịch thất bại' AS message;
    END;

    START TRANSACTION;

    -- Bước 1: Cộng tiền vào tài khoản
    SET SQL_SAFE_UPDATES = 0;
    UPDATE accounts
    SET balance = balance + p_amount
    WHERE accountID = p_accountID;

    -- Bước 2: Ghi log giao dịch
    INSERT INTO transactions (accountID, amount, log_message)
    VALUES (p_accountID, p_amount, 'Nạp tiền vào tài khoản');

    -- Nếu không có lỗi nào xảy ra
    COMMIT;
    SELECT 'Nạp tiền thành công' AS message;

END$$

DELIMITER ;
 
-- Kiểm thử
-- Gọi thủ tục nạp 1.000.000 VNĐ cho tài khoản ID = 3
CALL deposit_with_logging(3, 1000000);

-- Kiểm tra kết quả bảng accounts
SELECT accountID, balance
FROM accounts
WHERE accountID = 3;

-- Kiểm tra bảng transactions
SELECT *
FROM transactions
WHERE accountID = 3;