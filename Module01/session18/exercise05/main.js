let students = [
    { name: "Huấn", age: 18, className: "A1" },
    { name: "Cường", age: 22, className: "A1" }
];

let editIndex = -1;

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const className = document.getElementById("class").value.trim();

    if (!name || !age || !className) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (editIndex === -1) {
        students.push({ name, age, className });
    } else {
        students[editIndex] = { name, age, className };
        editIndex = -1;
        document.querySelector(".add-btn").innerText = "Thêm sinh viên";
    }

    clearForm();
    render();
}

function deleteStudent(index) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        students.splice(index, 1);
        render();
    }
}

function editStudent(index) {
    const s = students[index];
    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("class").value = s.className;
    editIndex = index;
    document.querySelector(".add-btn").innerText = "Cập nhật";
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("class").value = "";
}

function render() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const tbody = document.getElementById("list");
    tbody.innerHTML = "";

    students
        .filter(s => s.name.toLowerCase().includes(keyword))
        .forEach((s, index) => {
            tbody.innerHTML += `
                    <tr>
                        <td>${s.name}</td>
                        <td>${s.age}</td>
                        <td>${s.className}</td>
                        <td>
                            <button class="edit" onclick="editStudent(${index})">Sửa</button>
                            <button class="delete" onclick="deleteStudent(${index})">Xóa</button>
                        </td>
                    </tr>
                `;
        });
}

render();