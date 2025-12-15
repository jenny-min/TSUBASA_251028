let todos = [];
let editIndex = null;

// READ
function renderTodos() {
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        list.innerHTML += `
                <li>
                    <span>${todo}</span>
                    <div class="actions">
                        <button onclick="editTodo(${index})">Edit</button>
                        <button onclick="deleteTodo(${index})">Delete</button>
                    </div>
                </li>
            `;
    });
}

// CREATE & UPDATE
function addTodo() {
    const input = document.getElementById("todoInput");
    const value = input.value.trim();

    if (value === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }

    if (editIndex === null) {
        // CREATE
        todos.push(value);
    } else {
        // UPDATE
        todos[editIndex] = value;
        editIndex = null;
    }

    input.value = "";
    renderTodos();
}

// UPDATE
function editTodo(index) {
    document.getElementById("todoInput").value = todos[index];
    editIndex = index;
}

// DELETE
function deleteTodo(index) {
    if (confirm("Bạn có chắc muốn xóa không?")) {
        todos.splice(index, 1);
        renderTodos();
    }
}