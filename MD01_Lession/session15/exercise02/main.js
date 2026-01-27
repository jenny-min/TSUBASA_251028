//Bài 2: Viết một chương trình khai báo một mảng ký tự. In ra số “ký tự số” trong mảng.
// Khai báo mảng ký tự
let arr = ['a', '1', 'b', '3', '9', 'x', '0', 'k'];

// Biến đếm ký tự số
let count = 0;

// Duyệt mảng
for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= '0' && arr[i] <= '9') {
        count++;
    }
}

// In kết quả
console.log("Số ký tự số trong mảng là:", count);

//Bài 4: Viết một chương trình nhập vào 2 chuỗi, sau đó kiểm tra xem hai chuỗi có giống nhau hay không.
let str1 = prompt("Nhập chuỗi thứ nhất:");
let str2 = prompt("Nhập chuỗi thứ hai:");

if (str1.toLowerCase() === str2.toLowerCase()) {
    console.log("Hai chuỗi giống nhau");
} else {
    console.log("Hai chuỗi không giống nhau");
}
//Bài 1: Viết một chương trình để in các ký tự trong một mảng theo thứ tự đảo ngược. Ví dụ, nếu một mảng chứa các ký tự [ ‘c’, ‘s’, ‘c’, ‘2’, ‘6’, ‘1’ ] sau khi thực hiện đảo ngược sẽ là “261csc”
let arr1 = ['c', 's', 'c', '2', '6', '1'];

let result = arr1.reverse().join("");

console.log(result);