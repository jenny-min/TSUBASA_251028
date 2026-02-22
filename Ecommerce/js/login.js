// ===================
// Lấy các element
// ===================
const formLogin = document.querySelector("#formLogin");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const loginError = document.querySelector("#loginError");
const rememberCheckbox = document.querySelector("#gridCheck");

// ===================
// Helper hiển thị lỗi
// ===================
function showError(element, message) {
    element.style.display = "block";
    element.innerText = message;
}

function hideError(element) {
    element.style.display = "none";
    element.innerText = "";
}

// ===================
// Validate email
// ===================
function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
}

// ===================
// Validate password
// ===================
function isValidPassword(password) {
    return password.length >= 8;
}

// ===================
// Validate input khi blur
// ===================
emailEl.addEventListener("blur", () => {
    if (!emailEl.value) {
        showError(emailError, "Email không được để trống");
    } else if (!validateEmail(emailEl.value)) {
        showError(emailError, "Email không đúng định dạng");
    } else {
        hideError(emailError);
    }
});

passwordEl.addEventListener("blur", () => {
    if (!passwordEl.value) {
        showError(passwordError, "Mật khẩu không được để trống");
    } else if (!isValidPassword(passwordEl.value)) {
        showError(passwordError, "Mật khẩu phải có ít nhất 8 ký tự");
    } else {
        hideError(passwordError);
    }
});

// ===================
// Xử lý submit form
// ===================
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    hideError(emailError);
    hideError(passwordError);
    hideError(loginError);

    let isValid = true;

    // Email
    if (!emailEl.value) {
        showError(emailError, "Email không được để trống");
        isValid = false;
    } else if (!validateEmail(emailEl.value)) {
        showError(emailError, "Email không đúng định dạng");
        isValid = false;
    }

    // Password
    if (!passwordEl.value) {
        showError(passwordError, "Mật khẩu không được để trống");
        isValid = false;
    } else if (!isValidPassword(passwordEl.value)) {
        showError(passwordError, "Mật khẩu phải có ít nhất 8 ký tự");
        isValid = false;
    }

    if (!isValid) return;

    // Lấy danh sách user từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm user
    const user = users.find(
        (u) => u.email === emailEl.value && u.password === passwordEl.value
    );

    if (!user) {
        showError(loginError, "Tài khoản không tồn tại");
        return;
    }

    // Lưu user đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Nếu tick "Nhớ tài khoản"
    if (rememberCheckbox.checked) {
        localStorage.setItem("rememberMe", JSON.stringify(user));
    } else {
        localStorage.removeItem("rememberMe");
    }

    // Chuyển hướng
    window.location.href = "../pages/dashboard.html";
});