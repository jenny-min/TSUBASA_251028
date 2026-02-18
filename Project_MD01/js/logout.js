function handleLogout() {
    // Lấy ra element của trang
    const btnLogout = document.getElementById("btnLogout");

    // Xác nhận trước khi xóa, cần sửa lại thành modal confirm
    if (!confirm("Bạn có chắc chắn muốn thoát tài khoản không?")) {
        return;
    }
    // Xóa thông tin đăng nhập hiện tại
    localStorage.removeItem("currentUser");

    // Chuyển về trang đăng nhập
    window.location.href = "../pages/login.html";
}