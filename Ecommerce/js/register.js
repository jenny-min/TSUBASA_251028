// Lấy ra elements của trang
const formRegister = document.querySelector("#formRegister");
const userFamilyNameElement = document.querySelector("#userFamilyName");
const userNameElement = document.querySelector("#userName");
const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const rePasswordElement = document.querySelector("#rePassword");
const agreeElement = document.querySelector("#agree");
const messageElement = document.querySelector("#message");

// Elements liên quan đến lỗi
const userFamilyNameError = document.querySelector("#userFamilyNameError");
const userNameError = document.querySelector("#userNameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const rePasswordError = document.querySelector("#rePasswordError");

// Lấy dữ liệu từ Localstorage (Cần chuyển dữ liệu thành mảng/chuỗi (object, array) trước khi lấy về thông qua phương thức JSON.parse, lưu ý khi lưu vào localstorage thường được lưu dưới dạng string thông qua phương thức stringtify)
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

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


// Lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const familyName = userFamilyNameElement.value.trim();
    const userName = userNameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();
    const rePassword = rePasswordElement.value.trim();

    // Reset message
    messageElement.textContent = "";

    // Họ
    if (!familyName) {
        userFamilyNameError.style.display = "block";
        userFamilyNameError.innerHTML = "Họ không được để trống";
        isValid = false;
    } else {
        userFamilyNameError.style.display = "none";
    }

    // Tên
    if (!userName) {
        userNameError.style.display = "block";
        userNameError.innerHTML = "Tên không được để trống";
        isValid = false;
    } else {
        userNameError.style.display = "none";
    }

    // Email
    if (!email) {
        emailError.style.display = "block";
        emailError.innerHTML = "Email không được để trống";
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.style.display = "block";
        emailError.innerHTML = "Email không đúng định dạng";
        isValid = false;
    } else {
        const isEmailExist = userLocal.some(user => user.email === email);
        if (isEmailExist) {
            emailError.style.display = "block";
            emailError.innerHTML = "Email đã tồn tại";
            isValid = false;
        } else {
            emailError.style.display = "none";
        }
    }

    // Mật khẩu
    if (!password) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Mật khẩu không được để trống";
        isValid = false;
    } else if (!isValidPassword(password)) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Mật khẩu phải có ít nhất 8 ký tự";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // Nhập lại mật khẩu
    if (!rePassword) {
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Vui lòng nhập lại mật khẩu";
        isValid = false;
    } else if (password !== rePassword) {
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
        isValid = false;
    } else {
        rePasswordError.style.display = "none";
    }

    // Checkbox
    if (!agreeElement.checked) {
        messageElement.textContent = "Vui lòng đồng ý với chính sách và điều kiện!";
        messageElement.className = "text-error";
        isValid = false;
    }

    if (!isValid) return;

    // Tạo user
    const user = {
        userId: Date.now(),
        userFamilyName: familyName,
        userName: userName,
        email: email,
        password: password
    };

    userLocal.push(user);
    localStorage.setItem("users", JSON.stringify(userLocal));

    messageElement.textContent = "Đăng ký thành công!";
    messageElement.className = "text-success";

    setTimeout(function () {
        window.location.href = "../pages/login.html";
    }, 1000);
});