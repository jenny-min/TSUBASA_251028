// category-manager.js

// ======================
// Dữ liệu giả lập
// ======================
let categories = [
    { id: "C001", name: "Điện thoại", status: "active" },
    { id: "C002", name: "Laptop", status: "inactive" },
    { id: "C003", name: "Phụ kiện", status: "active" },
    { id: "C004", name: "Tivi", status: "active" },
    { id: "C005", name: "Máy giặt", status: "inactive" },
    { id: "C006", name: "Tủ lạnh", status: "active" },
    { id: "C007", name: "Loa", status: "active" },
    { id: "C008", name: "Camera", status: "inactive" },
    { id: "C009", name: "Bàn ghế", status: "active" },
    { id: "C010", name: "Đèn", status: "active" },
];

// Giả lập sản phẩm để kiểm tra xóa danh mục
let products = [
    { id: "P001", name: "iPhone 14", categoryId: "C001" },
    { id: "P002", name: "Macbook Pro", categoryId: "C002" },
    { id: "P003", name: "Tai nghe", categoryId: "C003" },
];

// ======================
// Pagination
// ======================
let currentPage = 1;
const pageSize = 8;

// ======================
// DOM Elements
// ======================
const tbody = document.querySelector("#tbody");
const searchInput = document.querySelector("#searchInput");
const statusSelect = document.querySelector(".status-select");
const paginationComponent = document.querySelector("#pagination-component");

const addModal = document.querySelector("#form-add-category");
const updateModal = document.querySelector("#form-update-category");
const deleteModal = document.createElement("div");
deleteModal.id = "deleteModal";
deleteModal.className = "overlay";
deleteModal.innerHTML = `
  <div class="form">
    <h4>Xác nhận xóa danh mục</h4>
    <p id="deleteMessage"></p>
    <div class="form-footer-button">
      <button id="btnCancelDelete" class="btn-overlay">Hủy</button>
      <button id="btnConfirmDelete" class="btn-overlay">Xóa</button>
    </div>
  </div>
`;
document.body.appendChild(deleteModal);

const addForm = addModal.querySelector("form");
const updateForm = updateModal.querySelector("form");

const addIdInput = document.querySelector("#category-code");
const addNameInput = document.querySelector("#category-name");

const updateIdInput = document.querySelector("#categoryId");
const updateNameInput = document.querySelector("#categoryName");

// ======================
// Helpers
// ======================

// Lọc danh mục theo tìm kiếm + trạng thái
function filterCategories() {
    const keyword = searchInput.value.toLowerCase();
    const status = statusSelect.value;
    return categories.filter((cat) => {
        const matchName = cat.name.toLowerCase().includes(keyword);
        const matchStatus = !status || cat.status === status;
        return matchName && matchStatus;
    });
}

// Phân trang
function paginate(data, page = 1) {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
}

// Render bảng
function renderTable() {
    const filtered = filterCategories();
    const pagedData = paginate(filtered, currentPage);
    tbody.innerHTML = "";

    if (pagedData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center">Không có dữ liệu</td></tr>`;
        renderPagination(filtered.length);
        return;
    }

    pagedData.forEach((cat) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${cat.id}</td>
      <td>${cat.name}</td>
      <td>${cat.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
      <td>
        <button class="btn-edit btn btn-sm btn-primary" data-id="${cat.id}">Sửa</button>
        <button class="btn-delete btn btn-sm btn-danger" data-id="${cat.id}">Xóa</button>
      </td>
    `;
        tbody.appendChild(tr);
    });

    renderPagination(filtered.length);
}

// Render phân trang
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    paginationComponent.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "btn btn-primary m-1" : "btn btn-light m-1";
        btn.addEventListener("click", () => {
            currentPage = i;
            renderTable();
        });
        paginationComponent.appendChild(btn);
    }
}

// ======================
// Modal control
// ======================
function openModal(modal) {
    modal.style.display = "flex";
}

function closeModal(modal) {
    modal.style.display = "none";
}

// ======================
// Thêm danh mục
// ======================
function handleAddCategory(event) {
    event.preventDefault();
    const id = addIdInput.value.trim();
    const name = addNameInput.value.trim();
    const status = addModal.querySelector('input[name="status"]:checked').value;

    if (!id || !name) {
        alert("Vui lòng điền đầy đủ Mã và Tên danh mục!");
        return;
    }

    if (categories.some(c => c.id === id)) {
        alert("Mã danh mục đã tồn tại!");
        return;
    }

    categories.push({ id, name, status });
    currentPage = 1;
    renderTable();
    closeModal(addModal);
    addForm.reset();
}

// ======================
// Cập nhật danh mục
// ======================
let currentUpdateId = null;

function openUpdateModal(id) {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    currentUpdateId = id;

    updateIdInput.value = cat.id;
    updateNameInput.value = cat.name;
    updateModal.querySelectorAll('input[name="status-update"]').forEach(r => {
        r.checked = r.value === cat.status;
    });

    openModal(updateModal);
}

function handleUpdateCategory(event) {
    event.preventDefault();
    const name = updateNameInput.value.trim();
    const status = updateModal.querySelector('input[name="status-update"]:checked').value;

    if (!name) {
        alert("Tên danh mục không được để trống!");
        return;
    }

    const index = categories.findIndex(c => c.id === currentUpdateId);
    if (index !== -1) {
        categories[index].name = name;
        categories[index].status = status;
    }

    renderTable();
    closeModal(updateModal);
}

// ======================
// Xóa danh mục
// ======================
let currentDeleteId = null;

function openDeleteModal(id) {
    currentDeleteId = id;
    const cat = categories.find(c => c.id === id);
    const hasProduct = products.some(p => p.categoryId === id);
    const msg = hasProduct
        ? `Không thể xóa danh mục "${cat.name}" vì còn sản phẩm tồn tại.`
        : `Bạn có chắc chắn muốn xóa danh mục "${cat.name}"?`;
    document.getElementById("deleteMessage").textContent = msg;
    document.getElementById("btnConfirmDelete").disabled = hasProduct;
    openModal(deleteModal);
}

function handleDeleteCategory() {
    if (!currentDeleteId) return;
    categories = categories.filter(c => c.id !== currentDeleteId);
    currentDeleteId = null;
    renderTable();
    closeModal(deleteModal);
}

// ======================
// Event Listeners
// ======================
addForm.addEventListener("submit", handleAddCategory);
updateForm.addEventListener("submit", handleUpdateCategory);

searchInput.addEventListener("input", () => { currentPage = 1; renderTable(); });
statusSelect.addEventListener("change", () => { currentPage = 1; renderTable(); });

// Sửa / Xóa từ bảng
tbody.addEventListener("click", e => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("btn-edit")) openUpdateModal(id);
    if (e.target.classList.contains("btn-delete")) openDeleteModal(id);
});

// Xóa modal xác nhận
document.getElementById("btnCancelDelete").addEventListener("click", () => closeModal(deleteModal));
document.getElementById("btnConfirmDelete").addEventListener("click", handleDeleteCategory);

// Đóng modal khi click ra ngoài
window.addEventListener("click", e => {
    if ([addModal, updateModal, deleteModal].includes(e.target)) {
        closeModal(e.target);
    }
});

// ======================
// Initial render
// ======================
renderTable();