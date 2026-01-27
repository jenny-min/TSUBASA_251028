// Danh sách sinh viên ban đầu (rỗng)
let students = [];

// Hàm thêm sinh viên mới
function addStudent() {
    let name = prompt("Nhập tên sinh viên:");
    let age = Number(prompt("Nhập tuổi sinh viên:"));
    let id = prompt("Nhập mã số sinh viên (ID):");

    // Tạo object sinh viên
    let student = {
        id: id,
        name: name,
        age: age
    };

    students.push(student);
    alert("Thêm sinh viên thành công!");
}

// Hàm hiển thị danh sách sinh viên
function showStudents() {
    if (students.length === 0) {
        alert("Danh sách sinh viên trống!");
        return;
    }

    let list = "Danh sách sinh viên:\n";
    for (let student of students) {
        list += `ID: ${student.id}, Tên: ${student.name}, Tuổi: ${student.age}\n`;
    }
    alert(list);
}

// Hàm xóa sinh viên theo ID
function deleteStudent() {
    let id = prompt("Nhập ID sinh viên cần xóa:");
    let index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        students.splice(index, 1);
        alert(`Xóa sinh viên có ID ${id} thành công!`);
    } else {
        alert(`Không tìm thấy sinh viên có ID ${id}.`);
    }
}

// Menu điều khiển
function menu() {
    let choice;
    do {
        choice = prompt(
            "Quản lý sinh viên:\n" +
            "1. Thêm sinh viên:\n" +
            "2. Hiển thị danh sách sinh viên:\n" +
            "3. Xóa sinh viên theo ID:\n" +
            "0. Thoát"
        );

        switch (choice) {
            case "1":
                addStudent();
                break;
            case "2":
                showStudents();
                break;
            case "3":
                deleteStudent();
                break;
            case "0":
                alert("Thoát chương trình.");
                break;
            default:
                alert("Lựa chọn không hợp lệ!");
        }
    } while (choice !== "0");
}

// Chạy chương trình
menu();