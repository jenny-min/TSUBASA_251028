function sum(a, b) {
    return a + b;
}

// Nhập dữ liệu từ người dùng
var num1 = Number(prompt("Nhập số thứ nhất:"));
var num2 = Number(prompt("Nhập số thứ hai:"));

// Gọi hàm và hiển thị kết quả
var result = sum(num1, num2);
alert("Tổng của hai số là: " + result);