-- [Bài tập] Truy vấn dữ liệu trên nhiều bảng
-- Hiển thị: Mã đơn hàng, Ngày đặt hàng, Tên khách hàng (JOIN Customers ↔ Orders)
SELECT
    o.order_id,
    o.order_date,
    c.customer_name
FROM Orders o
JOIN Customers c
    ON o.customer_id = c.customer_id;

-- Hiển thị danh sách sản phẩm trong mỗi đơn hàng (JOIN Orders ↔ Order_items)
SELECT
    o.order_id,
    oi.product_name,
    oi.quantity,
    oi.price
FROM Orders o
JOIN Order_items oi
    ON o.order_id = oi.order_id
ORDER BY o.order_id;

-- Tính tổng tiền của mỗi đơn hàng (Tổng tiền = SUM(quantity * price) 
SELECT
    o.order_id,
    SUM(oi.quantity * oi.price) AS total_amount
FROM Orders o
JOIN Order_items oi
    ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- Hiển thị các đơn hàng có tổng tiền > 10.000.000 - Dùng HAVING (vì có SUM)
SELECT
    o.order_id,
    SUM(oi.quantity * oi.price) AS total_amount
FROM Orders o
JOIN Order_items oi
    ON o.order_id = oi.order_id
GROUP BY o.order_id
HAVING SUM(oi.quantity * oi.price) > 10000000;


 