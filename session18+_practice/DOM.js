//Để tương tác, thay đổi được phần tử trong DOM => Lấy ra được phần tử đó
//Lấy ra các phần tử trong DOM thông qua id, class, selector,...
const heading_1 = document.getElementById('heading-1');
console.log("heading-1");

const box = document.querySelector(".box");
console.log("box");

//Lấy ra phần tửu của button thêm
const btnAdd = document.querySelector("#btn-add");

btnAdd.onclick = () => {
    console.log("Đã nhấn nút thêm");
};

const btnEdit = document.querySelector("#btn-edit");

btnEdit.addEventListener("click", function () {
    console.log("Button edit được thực thi");

});

//Lấy giá trị trong input
//đối số event chỉ là tượng trưng, đặt tên sao cũng đc
function handleChange(event) {
    console.log("Changed", event.target.value);
}



const users = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nva@gmail.com",
        password: 12345
    },
    {
        id: 1,
        name: "Nguyễn Văn B",
        email: "nvb@gmail.com",
        password: 12345
    },
    {
        id: 1,
        name: "Nguyễn Văn C",
        email: "nvc@gmail.com",
        password: 12345
    }
]
//Bắt sự kiện submit form
function handleSubmit(event) {
    // Ngăn chặn sự kiện mặc định có trong form
    event.preventDefault();
    console.log("Form submited....");

    //Lấy thông tin từ form
    const emailInputElement = document.querySelector("#email-input");
    const passwordInputElement = document.querySelector("#password-input");
    const emailErrorElement = document.querySelector("#email-error");
    const passwordErrorElement = document.querySelector("#password-error");
    //Gộp các dữ liệu từ người dùng thành 1 đối tượng
    // const userInfo = {
    //     email: emailInputElement.value,
    //     password: passwordInputElement.value
    // };

    //Validate dữ liệu
    if (!emailErrorElement.value) {
        //Hiển thị lỗi của email
        emailErrorElement.style.display = "block";
    } else {
        //Ẩn lỗi của email
        emailErrorElement.style.display = "none";
    }

    if (!passwordErrorElement.value) {
        //Hiển thị lỗi của password
        passwordErrorElement.style.display = "block";
    } else {
        // Ẩnlỗi của password
        passwordErrorElement.style.display = "block";
    }

    //Kiểm tra bắt buộc email và password phải có dữ liệu
    if (emailInputElement.value && passwordInputElement.value) {
        //Tạo biến cờ (flat) để lưu trữ trạng thái thành công hoặc thất bại
        let isLoginSuccessFull = false;

        //Kiểm tra dữ liệu lấy từ Form với mảng users
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === emailInputElement.value && users[i].password === passwordInputElement.value) {
                console.log("Đăng nhập thành công");
                //Cập nhật lại trạng thái của biến isLoginSuccessFull
                isLoginSuccessFull = true;
                break; //Thoát ra khỏi vòng lặp
            }
        }

        //Kiểm tra trạng thái đăng nhập
        if (!isLoginSuccessFull) {
            console.log("Email hoặc mật khẩu không đúng");
        }
    }
}