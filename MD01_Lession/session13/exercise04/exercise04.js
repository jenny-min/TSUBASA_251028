// cho người dùng nhập vào dãy số bất kỳ
let input = prompt('Vui lòng nhập vào một dãy số, cách nhau bằng dấu ,');

//Sử dụng split() để chuyển đổi kiểu dữ liệu từ string sang kiểu array
let arr = input.split(',');

//Tiến hành duyệt các phần tử và tìm ra phần tử có giá trị lớn nhất trong mảng và thực hiện in ra màn hình bằng alert()
let max = Number(arr[0]);

for (let i = 1; i < arr.length; i++) {
    if (max < Number(arr[i])) {
        max = Number(arr[i]);
    }
}

alert(`Giá trị lớn nhất = ${max}`);