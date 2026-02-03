-- [Bài tập] Tạo danh sách liên lạc rút gọn 
-- Tạo view 
CREATE VIEW view_customer_contact AS
SELECT customer_id,
customer_name,
email,
phone
FROM customers;

-- Xem view
SELECT * FROM view_customer_contact; 