// fix cứng 1 danh sách sinh viên
const students = [
    {
        id: 1,
        name: "Nguyen Van A",
        age: 21,
        className: "C001"
    },
    {
        id: 2,
        name: "Nguyen Van B",
        age: 22,
        className: "C002"
    },
    {
        id: 3,
        name: "Nguyen Van C",
        age: 23,
        className: "C003"
    }
];

// Hàm hiển thị danh sách sinh viên
function displayStudents(students) {
    const studentList = document.getElementById("studentList");
    console.log('students: ', students);

    // Clear các phần tử DOM cũ

    // Duyệt qua mảng bằng bảng lặp forEach
    students.forEach(function (student, index) {
        console.log("student - index: ", student, index);
        // Tạo ra từng hàng tr
        const row = document.createElement("tr");

        row.innerHTML =
            `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.className}</td>
            <td>
              <button>Sửa</button>
              <button onclick="deleteStudent${index}">Xóa</button>
            </td>
            `
            ;

        //Gán thẻ tr và tbody
        studentList.appendChild(row);
    });
}

displayStudents(students);

// Hàm thêm mới sinh viên
function handleCreateStudent() {
    //Lấy ra các giá trị trong input
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const className = document.getElementById("className").value;

    if (name & age & className) {
        // Tiến hành thêm dữ liệu vào mảng
        const newStudent = {
            id: Math.ceil(Math.random() * 100000),
            name,
            age,
            className,
        }
        students.unshift(newStudent);
        //Render ra trình duyệt
        displayStudents(students);

        // Clear giá trị trong input 
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("className").value = "";

    } else {
        alert("Vui lòng điền đủ dữ liệu");
    }
}

// Hàm xóa sinh viên 
function deleteStudent(index) {
    // Xóa phần tử ra khỏi mảng
    students.splice(index, 1);
    // Render lại dữ liệu mới nhất ra ngoài dữ liệu
    displayStudents(students);

}

// Hàm tìm kiếm sinh viên theo tên
function handleSearchStudent(event) {
    // Lấy ra giá trị trong input và chuyển đổi về dạng viết hoa
    const searchTerm = event.target.value.toLowerCase;

    // Lấy giá trị từ input để tìm kiếm trong mảng
    const filteredStudents = students.filter(function (student) {
        // Kiểm tra logic
        return student.name.toLowerCase().includes(searchTerm);
    });

    // Gọi hàm hiển thị dữ liệu mới nhất
    displayStudents(filteredStudents);
}