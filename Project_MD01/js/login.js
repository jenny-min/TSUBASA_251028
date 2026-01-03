// Lấy ra element của trang
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");

// Elements liên quan đến lỗi
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");

/**
 * Validate địa chỉ email (regex)
 * @param {*} email : chuỗi email người dùng nhập vào
 * @returns : dữ liệu nếu email đúng định dạng, undefine nếu email không đúng định dạng
 */
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/**
 * Validate mật khẩu có 8 ký tự
 * @param {*} password : chuỗi mật khẩu người dùng nhập vào
 * @returns : dữ liệu nếu mật khẩu có ít nhât 8 ký tư, undefine nếu mật khẩu có ít hơn 8 ký tự
 */
function isValidPassword(password) {
    const regex = /^.{8,}$/; // ít nhất 8 ký tự
    return regex.test(password);
}

// Lắng nghe sự kiện submit form đăng nhập tài khoản
formLogin.addEventListener("submit", function (e) {
    // Ngăn chặn sự kiện default
    e.preventDefault();

    // Validate dữ liệu đầu vào
    // Email 
    if (!emailElement.value) {
        // Hiển thị lỗi
        emailError.style.display = "block";
    } else {
        // Ẩn thị lỗi
        emailError.style.display = "none";

        // Kiểm tra định dạng email
        if (!validateEmail(emailElement.value)) {
            // Hiển thị lỗi
            emailError.style.display = "block";
            emailError.innerHTML = "Email không đúng định dạng";
        }
    }

    // Mật khẩu 
    if (!passwordElement.value) {
        // Hiển thị lỗi
        passwordError.style.display = "block";
    } else {
        // Ẩn thị lỗi
        passwordError.style.display = "none";

        // Kiểm tra độ dài mật khẩu
        if (!isValidPassword(passwordElement.value)) {
            // Hiển thị lỗi
            passwordError.style.display = "block";
            passwordError.innerHTML = "Mật khẩu phải có ít nhất 8 lý tự";
        }
    }

    // Lấy dữ liệu từ local về
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm kiếm email và mật khẩu có tồn tại trên local
    const userFind = userLocal.find(
        (user) => user.email === emailElement.value &&
            user.password === passwordElement.value
    );

    if (!userFind) {
        // Nếu không thì thông báo cho người dùng nhập lại dữ liệu
        loginError.style.display = "block";
    } else {
        // Nếu có thì đăng nhập thành công và chuyển hướng về trang chủ
        window.location.href = "../pages/dashboard.html";
    }
})