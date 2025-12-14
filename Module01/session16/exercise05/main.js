//Cho người dùng nhập vào chuỗi ký tự và viết hàm kiểm tra xem đó có phải chuỗi ký tự đối xứng không:

// Người dùng nhập chuỗi bằng hàm prompt()
// Viết hàm isPalindrome() để kiểm tra chuỗi đối xứng
// Thực hiện thông báo cho người dùng bằng alert() có phải chuỗi đối xứng không

// Hàm kiểm tra chuỗi đối xứng
function isPalindrome(str) {
    var lowerCaseStr = str.toLowerCase();
    var reversedStr = lowerCaseStr.split("").reverse();

    return lowerCaseStr === reversedStr;
}

// Người dùng nhập chuỗi
var input = prompt("Nhập vào một chuỗi ký tự:");

// Kiểm tra và thông báo kết quả
if (isPalindrome(input)) {
    alert("Chuỗi bạn nhập là chuỗi đối xứng.");
} else {
    alert("Chuỗi bạn nhập KHÔNG phải là chuỗi đối xứng.");
}