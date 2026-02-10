-- [Bài tập] Tạo Stored Procedure Rút Tiền

-- Stored Procedure withdraw_money
DELIMITER $$

CREATE PROCEDURE withdraw_money (
    IN p_accountID INT,
    IN p_amount DECIMAL(10,2)
)

BEGIN
    DECLARE v_balance DECIMAL(10,2);

    START TRANSACTION;

    -- Trừ tiền trước (Optimistic)
    UPDATE accounts
    SET balance = balance - p_amount
    WHERE accountID = p_accountID;

    -- Lấy số dư sau khi trừ
    SELECT balance INTO v_balance
    FROM accounts
    WHERE accountID = p_accountID;

    -- Kiểm tra điều kiện
    IF v_balance < 0 THEN
        ROLLBACK;
        SELECT 'Số dư không đủ' AS message;
    ELSE
        COMMIT;
        SELECT 'Rút tiền thành công' AS message;
    END IF;

END$$

DELIMITER ;

-- Kiểm thử
-- TH1: Thất bại - Rút 5.000.000 từ tài khoản có 1.500.000
CALL withdraw_money(2, 5000000);

-- TH2: Thành công - Rút 100.000 từ tài khoản đó
CALL withdraw_money(2, 100000);

-- Kiểm tra lại số dư
SELECT accountID, balance
FROM accounts
WHERE accountID = 2;
  
  