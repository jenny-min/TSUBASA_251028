//Bài 1: Sử dụng vòng lặp để đếm từ 1 đến 100. Khi số là 99, hiển thị hộp thoại thông báo là đã hoàn thành
for (let i = 1; i <= 100; i++) {
    console.log(i); // Hiển thị số ra console

    if (i === 99) {
        alert("Đã hoàn thành!");
    }
}
//Bài 2: Sử dụng hàm prompt() để lấy thông tin nhiệt độ hiện tại được nhập bởi người truy cập. Nếu nhiệt độ nhập vào trên 100, yêu cầu người dùng giảm nhiệt độ. Nếu nhiệt độ dưới 20, yêu cầu người dùng tăng nhiệt độ.

//parseFloat(): chuyển dữ liệu nhập vào thành số thực.
//isNaN(): kiểm tra xem người dùng có nhập đúng số không.
let temperature = parseFloat(prompt("Nhập nhiệt độ hiện tại:"));

// Kiểm tra giá trị nhập vào
if (isNaN(temperature)) {
    alert("Vui lòng nhập một số hợp lệ!");
} else if (temperature > 100) {
    alert("Nhiệt độ quá cao! Vui lòng giảm nhiệt độ.");
} else if (temperature < 20) {
    alert("Nhiệt độ quá thấp! Vui lòng tăng nhiệt độ.");
} else {
    alert("Nhiệt độ hiện tại là " + temperature + "°C, nằm trong khoảng an toàn.");
}