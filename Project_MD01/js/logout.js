// function handleLogout() {
//     // Lấy ra element của trang
//     const btnLogout = document.getElementById("btnLogout");

//     // Xác nhận trước khi xóa, cần sửa lại thành modal confirm

//     if (!confirm("Bạn có chắc chắn muốn thoát tài khoản không?")) {
//         return;
//     }
//     // Xóa thông tin đăng nhập hiện tại
//     localStorage.removeItem("currentUser");

//     // Chuyển về trang đăng nhập
//     window.location.href = "../pages/login.html";
// }

// Lấy element
const btnLogout = document.getElementById("btnLogout");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");

// Khởi tạo modal (Bootstrap 5)
const logoutModal = new bootstrap.Modal(document.getElementById("logoutModal"));

// Khi click nút logout → hiển thị modal
btnLogout.addEventListener("click", function () {
    logoutModal.show();
});

// Khi click nút "Logout" trong modal → xóa user và redirect
confirmLogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser"); // Xóa user đăng nhập
    window.location.href = "../pages/login.html"; // Quay về login
});
