let users = JSON.parse(localStorage.getItem('users')) || [];

function handleSubmit(event) {
    //ngăn chặn sự kiện mặc định có trong form, sự kiện ở đây là việc nhấn submit form reset lại
    event.preventDefault();
    console.log("Form submited....");

    //lấy thông tin từ form
    const emailInputElement = document.getElementById("#email-input");
    const passwordInputElement = document.getElementById("#password-input");
    const passwordConfirmElement = document.getElementById("#password-confirm");
    const emailErrorElement = document.getElementById("#email-error");
    const passwordErrorElement = document.getElementById("#password-error");
    const wrongPasswordElement = document.getElementById("wrong-password");

    //Validate dữ liệu
    //email
    if (!emailInputElement.value) {
        //Hiển thị lỗi email
        emailErrorElement.style.display = "block";
    } else {
        //Ẩn lỗi email
        emailErrorElement.style.display = "none";
    }
    //password
    if (!passwordInputElement.value) {
        //Hiển thị lỗi password
        passwordErrorElement.style.display = "block";
    } else {
        //Ẩn lỗi password
        passwordErrorElement.style.display = "none";
    }
    //confirm password
    if (!passwordConfirmElement.value) {
        //Hiển thị lỗi không trùng password
        wrongPasswordElement.style.display = "block";
    } else {
        //Ẩn lỗi không trùng password
        wrongPasswordElement.style.display = "none";
    }

    //Kiểm tra bắt buộc email và password phải có dữ liệu
    if (emailInputElement.value && passwordInputElement.value) {
        //Tạo biến cờ (flat) để lưu trữ trạng thái thành công hoặc thất bại
        let isRegisterSuccessFull = false;

        //Kiểm tra dữ liệu lấy từ Form với mảng users
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === emailInputElement.value && users[i].password === passwordInputElement.value && users[i].password === passwordConfirmElement) {
                console.log("Đăng nhập thành công");
                //Cập nhật lại trạng thái của biến isLoginSuccessFull
                isRegisterSuccessFull = true;
                break; //Thoát ra khỏi vòng lặp
            }
        }

        //Kiểm tra trạng thái đăng nhập
        if (!isRegisterSuccessFull) {
            console.log("Email hoặc mật khẩu không đúng");
        }
    }

}