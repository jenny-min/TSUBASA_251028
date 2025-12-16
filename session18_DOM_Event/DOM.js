console.log("document", document.getElementById("heading-1"));
console.log("document", document.getElementById("heading-2"));

//Lấy ra 1 phần tử có class là box
console.log("box element: ", document.querySelector(".box"));

// Lấy ra tất cả các phần tử có class là box
// Kết quả trả về dạng NoteList (tương tự như mảng tuy nhiên có 1 số khác biệt)
//Không thể dùng các phương thức làm việc với mảng như push, pop(),...
console.log("box elements: ", document.querySelectorAll(".box"));

// Thay đổi nội dung phần tử trong DOM
// Lấy ra phần tử cần thay đổi
let heading1 = document.querySelector("#heading-1");

// Demo về innerHTML - trả về các thẻ HTML, không bao gôm các phần tử đã ẩn đi
// Lấy ra phần tử thông qua HTML
console.log(document.getElementById("myDiv").innerHTML);

// Thay đổi phần nội dung bên trong
document.getElementById("myDiv").innerHTML = "New content <i>here</i>";

// Demo về innerText - trả về nội dung bên trong thẻ HTML, không bao gôm các phần tử đã ẩn đi
console.log(document.getElementById("myDiv-1").innerHTML);
document.getElementById("myDiv-1").innerHTML = "New content here";

// Demo về textContent , bao gồm các phần tử đã ẩn đi
console.log(document.getElementById("myDiv-2").textContent);
document.getElementById("myDiv-2").textContent = "New content here";
