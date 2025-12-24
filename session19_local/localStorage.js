
// Lấy ra phần tử h1
const listNumberElement = document.querySelector("#list-number");

//Gắn lại nội dung cho thẻ h1

//Lấy dữ liệu từ localStorage và hiển thị dữ liệu ra ngoài giao diện
const listNumber = JSON.parse(localStorage.getItem('list-number'));
listNumberElement.textContent = listNumber;

// đẩy lên local thì đổi từ JS sang JSON chuôi
// Lấy về thì đổi từ JSON sang JS thông qua parse
function handleRandom() {
    //ceil làm tròn số lên trên
    //Push phần tử vào trong mảng
    numbers.push(Math.ceil(Math.random() * 10));

    //Lưu mảng lên local sau khi push
    localStorage.setItem('list-number', JSON.stringify(numbers));

    //cách chuyển đổi  kiểu dữ liệu từ mảng thành chuỗi
    listNumberElement.textContent = JSON.stringify(numbers);

}

//Các thao tác cơ bản với localStorage
//1. Thao tác ghi 
localStorage.setItem("userName", "Nguyễn Văn A");
localStorage.setItem("age", 20);

const users = [
    {
        id: 1,
        name: "Nam Anh",
    },
    {
        id: 2,
        name: "Nam An",
    },

];
localStorage.setItem("users", JSON.stringify(users));

const user = {
    id: 1,
    name: "Nguyễn Văn A",
};
const newUser = {
    id: 1,
    name: "Nguyễn Văn A",
};

localStorage.setItem("user", JSON.stringify(user));
//Cập nhật dữ liệu
localStorage.setItem("user", JSON.stringify(newUser));

//thao tác đọc dữ liệu
const listUser = localStorage.getItem("users");

//chuyển đổi kiểu JSON (chuỗi) thành kiểu JS
console.log("listUser", JSON.parse(listUser));

//2. thao tác xóa dữ liệu
localStorage.removeItem('age');
localStorage.removeItem('user');

//Thao tác xóa hết tất cả dữ liệu trên localStorge
// localStorage.clear();