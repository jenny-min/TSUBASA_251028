// Bài 1: Viết chương trình khởi tạo nhập vào một mảng số nguyên gồm 10 phần tử. Chương trình thực hiện tính và hiển thị xem có bao nhiêu số nguyên lớn hơn hoặc bằng 10.

//Các bước thực hiện
//Bước 1: Nhập vào các số nguyên
const numbers = [];

for (let i = 0; i < 10; i++) {
    // sử dụng hàm promt để nhập từng số
    let number = +prompt(`Vui lòng nhập số thứ ${i}`);

    //Kiểm tra nếu dữ liệu nhập vào phải là số -> thao tác này không xác định được khi nào người dùng nhập đúng
    while (isNaN(number)) {//nếu dữ liệu nhập vào không phải là số thì yêu cầu nhập lại cho đến khi đúng thì thôi
        number = +prompt("Giá trị không phải là số. Vui lòng nhập lại");
    }
    //Thêm phần tử vào trong mảng
    numbers.push(number);
}

const array = []; //mảng lưu trữ các giá trị thỏa mãn điều kiện
//Bước 2: Duyệt qua mảng
for (let i = 0; i < numbers.length; i++) {
    //Bước 3: Kiểm tra điều kiện
    if (numbers[i] >= 10) {
        array.push(numbers[i]);//Thêm các giá trị vào trong mảng thõa mãn điều kiện
    }
}
//Bước 4: Trả về kết quả cuối cùng (mảng các số >= 10 và tổng số lượng)
console.log("array", array);

//Bài 2: Viết chương trình khởi tạo nhập vào một mảng số nguyên gồm 10 phần tử khác nhau. Chương trình hiển thị ra được phần tử có giá trị lớn nhất trong mảng và vị trí của phần tử đó.

// const myArray = [10, 20, 50, 100, 40, 30];


//Bước 1: Khai báo 1 biến max (mặc định sẽ là phần tử đầu tiên)
let max = array[0];
let index = 0;

//Bước 2: Duyệt qua mảng
for (let i = 1; i < array.length; i++) {
    //Bước 3: lấy biến max so sánh với từng phần tử trong mảng
    //Case 1: Nếu max > next_element -> Giữ nguyên
    //Case 2: Nếu max < next_element -> gán lại max = next_element

    if (array[i] > max) {
        max = array[i];
        index = i;
    }

}

console.log(`Giá trị max là ${max}, tại vị trí ${index}`);

//Bài 3: Viết chương trình khởi tạo nhập vào một mảng số nguyên. Hiển hiện giá trị lớn nhất trong mảng đó và giá trị trung bình của các phần tử trong mảng.
//Bước 1: Khai báo 1 biếm sum bằng 0
let sum = 0;//biến lưu trữ

//Bước 2: Duyệt qua mảng
for (let i = 0; i < array.length; i++) {
    //Bước 3: Tính tổng bằng cách duyệt qua từng phần tử trong mảng và cộng giá trị của phần tử vào sum
    sum += array[i];
}
//Bước 4: tính trung bình bằng cách lấy sum chia cho chiều dài của mảng
const average = sum / array.length;
// let tb = array.reduce((a, b) => a + b, 0) / array.length;

console.log(`Giá trị trung bình của các phần tử trong mảng là ${average}`);
