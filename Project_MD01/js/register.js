// Lấy ra elements của trang
const formRegister = document.getElementById("formRegister");
const userFamilyNameElement = document.getElementById("userFamilyName");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");
const agreeElement = document.getElementById("agree");
const messageElement = document.getElementById("message");

// Elements liên quan đến lỗi
const userFamilyNameError = document.getElementById("userFamilyNameError");
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");

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
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // Validate dữ liệu đầu vào
    // Họ và tên đệm 
    if (!userFamilyNameElement.value) {
        // Hiển thị lỗi
        userFamilyNameError.style.display = "block";
    } else {
        // Ẩn lỗi
        userFamilyNameError.style.display = "none";
    }

    // Tên 
    if (!userNameElement.value) {
        // Hiển thị lỗi
        userNameError.style.display = "block";
    } else {
        // Ẩn lỗi
        userNameError.style.display = "none";
    }

    // Email 
    if (!emailElement.value) {
        // Hiển thị lỗi
        emailError.style.display = "block";
    } else {
        // Ẩn lỗi
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
        // Ẩn lỗi
        passwordError.style.display = "none";

        // Kiểm tra độ dài mật khẩu
        if (!isValidPassword(passwordElement.value)) {
            // Hiển thị lỗi
            passwordError.style.display = "block";
            passwordError.innerHTML = "Mật khẩu phải có ít nhất 8 lý tự";
        }
    }

    // Nhập lại mật khẩu 
    if (!rePasswordElement.value) {
        // Hiển thị lỗi
        rePasswordError.style.display = "block";
    } else {
        // Ẩn lỗi
        rePasswordError.style.display = "none";
    }

    // Kiểm tra mật khẩu và nhập lại mật khẩu
    if (passwordElement.value !== rePasswordElement.value) {
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
    }

    // Gửi dữ liệu từ form lên localStorage
    if (userFamilyNameElement.value &&
        userNameElement.value &&
        emailElement.value &&
        passwordElement.value &&
        rePasswordElement.value &&
        validateEmail(emailElement.value) &&
        isValidPassword(passwordElement.value) &&
        passwordElement.value === rePasswordElement.value) {

        // Kiểm tra checkbox
        if (!agreeElement.checked) {
            messageElement.textContent = "Vui lòng đồng ý với chính sách và điều kiện!";
            messageElement.className = "text-error";
            return;
        }

        // Lấy dữ liệu từ form và gộp thành đối tượng user
        const user = {
            userId: Math.ceil(Math.random() * 1000000000),
            userFamilyName: userFamilyNameElement.value,
            userName: userNameElement.value,
            email: emailElement.value,
            password: passwordElement.value
        };

        // Push user vào trong mảng userLocal
        userLocal.push(user);

        // Lưu trữ dữ liệu lên local
        localStorage.setItem("users", JSON.stringify(userLocal));

        // Hiển thị thông báo thành công
        messageElement.textContent =
            "Đăng ký thành công!";
        messageElement.className = "text-success";

        // Chuyển hướng về trang đăng nhập sau 1s
        setTimeout(function () {
            window.location.href = "../pages/login.html";
        }, 1000);
    }
});