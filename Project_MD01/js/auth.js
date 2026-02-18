// Kiểm tra đăng nhập khi vào dashboard
(function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        // Nếu chưa đăng nhập → quay về login
        window.location.href = "../pages/login.html";
    }
})();
