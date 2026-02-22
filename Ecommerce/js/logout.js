document.addEventListener("DOMContentLoaded", function () {
    // Render sidebar & header
    document.querySelector("#menu-component").innerHTML = renderAside("dashboard");
    document.querySelector("#header-component").innerHTML = renderHeader("dashboard");

    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "../pages/login.html";
        return;
    }

    // Lấy nút logout sau khi render header
    const btnLogout = document.getElementById("btnLogout");
    const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
    const logoutModal = new bootstrap.Modal(document.getElementById("logoutModal"));

    // Mở modal khi click logout
    btnLogout.addEventListener("click", function () {
        logoutModal.show();
    });

    // Xác nhận logout → xóa user và redirect
    confirmLogoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "../pages/login.html";
    });
});