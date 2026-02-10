-- [Bài tập] Gửi tiền vào tài khoản

-- Tạo bảng accounts 
CREATE TABLE accounts (
    accountID INT PRIMARY KEY,
    balance DECIMAL(10,2) NOT NULL
);

-- Thêm 10 tài khoản vào bảng 
INSERT INTO accounts (accountID, balance) VALUES
(1, 5000000.00),
(2, 3000000.00),
(3, 7000000.00),
(4, 2000000.00),
(5, 9000000.00),
(6, 1000000.00),
(7, 4000000.00),
(8, 6000000.00),
(9, 8000000.00),
(10, 2500000.00);

-- Kiểm tra số dư trước khi giao dịch
SELECT accountID, balance
FROM accounts
WHERE accountID = 1;

-- Bắt đầu TRANSACTION
START TRANSACTION;

-- Cộng thêm 1.000.000 VNĐ vào tài khoản accountID = 1
SET SQL_SAFE_UPDATES = 0;
UPDATE accounts
SET balance = balance + 1000000
WHERE accountID = 1;

-- Lưu thay đổi (xác nhận giao dịch thành công) 
COMMIT;

-- Kiểm tra số dư sau khi giao dịch
SELECT accountID, balance
FROM accounts
WHERE accountID = 1;

 