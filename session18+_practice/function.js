//Tên hàm là 1 động từ, danh từ thường là tên biến
//Xác định tham số truyền vào

//Bài xây dựng hàm tính tổng 2 số nguyên
function handleTotal(firstNumber, secondNumber) {
    //Đây là nơi xử lý các logic nghiệp vụ
    console.log("Sum = ", firstNumber + secondNumber);


    //Trả về kết quả cho hàm (từ khóa return là bắt buộc để trả về giá trị cho hàm)
    return firstNumber + secondNumber;
}

//Để hàm được thực thi => thì bắt buộc phải gọi hàm (call function)
handleTotal();
//Tham số là giá trị truyền vào khi khai báo hàm
//Đối số là giá trị truyền vào khi trả về kết quả
//Tham số truyền vào bao nhiêu thì truyền vào bấy nhiêu đối số


//Phương thức forEach()
const numbers = [1, 2, 3, 4, 5, 6, 7];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

numbers.forEach(function (element, index, array)) {

}

//element: đại diện cho từng phần tử của mảng
//index: vị trí của phần tử trong mảng
//array: là mảng của element


// Hàm filter: được sử dụng đẻ duyệt qua các phần tử của mảng, nó trả về 1 mảng mới có các phần tử thỏa mảng điều kiện
///Bài toán: cho mảng số nguyên A, hãy lọc ra các số chẵn và trả về 1 mảng cái số chẵn trong mảng A

const firstArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//Output: newArray = [2, 4, 6, 8, 10]


//Cách 1:
// const newArray = [];
// for (let i = 0; i < firstArray.length; i++) {
//     if (firstArray[i] % 2 === 0) {
//         newArray.push(firstArray[i]);
//     }
// }

// console.log("new = ", newArray);


//Cách 2:
const newArray = firstArray.filter(function (element, index, array) {
    //Kiểm trả điều kiện
    return element % 2 === 0;
})

console.log("newArray = ", newArray);
