function login() {
    // Tài khoản fix cứng
    const correctEmail = "huanrose@gmail.com";
    const correctPassword = "123456";

    // Lấy dữ liệu người dùng nhập
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Kiểm tra đăng nhập
    if (email === correctEmail && password === correctPassword) {
        alert("Đăng nhập thành công!");
    } else {
        alert("Đăng nhập thất bại!");
    }
}