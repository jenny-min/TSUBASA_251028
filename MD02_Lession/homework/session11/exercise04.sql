-- [Bài tập] Chuyển Tiền Giữa Hai Tài Khoản

-- Tạo Stored Procedure transfer_money
DELIMITER $$

CREATE PROCEDURE transfer_money (
    IN p_sender_id INT,
    IN p_receiver_id INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE v_sender_balance DECIMAL(10,2);

    -- Bắt mọi lỗi SQL → rollback
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Đã xảy ra lỗi hệ thống! Giao dịch thất bại' AS message;
    END;

    START TRANSACTION;

    -- Lấy số dư người gửi
    SELECT balance
    INTO v_sender_balance
    FROM accounts
    WHERE accountID = p_sender_id
    FOR UPDATE;

    -- Kiểm tra đủ tiền
    IF v_sender_balance < p_amount THEN
        ROLLBACK;
        SELECT 'Số dư người gửi không đủ' AS message;
    ELSE
        -- Trừ tiền người gửi
        UPDATE accounts
        SET balance = balance - p_amount
        WHERE accountID = p_sender_id;

        -- Cộng tiền người nhận
        UPDATE accounts
        SET balance = balance + p_amount
        WHERE accountID = p_receiver_id;

        COMMIT;
        SELECT 'Chuyển tiền thành công' AS message;
    END IF;

END$$

DELIMITER ;

-- Kiểm thử
-- Chuyển 3.000.000 VNĐ từ ID = 4 sang ID = 5
CALL transfer_money(4, 5, 3000000);

-- Chuyển 300.000 VNĐ từ ID = 4 sang ID = 5
CALL transfer_money(4, 5, 300000);

-- Kiểm tra kết quả số dư
SELECT accountID, balance
FROM accounts
WHERE accountID IN (4, 5); 