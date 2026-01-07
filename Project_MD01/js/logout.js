function handleLogout() {
    // Chặn vào dashboard khi chưa đăng nhập
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "../pages/login.html";
    }

    // Lấy ra element của trang
    const btnLogout = document.getElementById("btnLogout");

    // Xác nhận trước khi xóa
    if (!confirm("Bạn có chắc chắn muốn thoát tài khoản không?")) {
        return;
    }
    // Xóa thông tin đăng nhập hiện tại
    localStorage.removeItem("currentUser");

    // Chuyển về trang đăng nhập
    window.location.href = "../pages/login.html";
}