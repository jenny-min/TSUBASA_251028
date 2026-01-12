// Các phần tử trong DOM
const formCategory = document.querySelector("#form-add-category");
const formUpdateCategory = document.querySelector("#form-update-category");
const formDeleteCategory = document.querySelector("#form-delete-category");

const categoryCodeInput = document.querySelector("#category-code");
const categoryNameInput = document.querySelector("#category-name");
const updateCodeInput = document.querySelector("#categoryId");
const updateNameInput = document.querySelector("#categoryName");
const tbodyElement = document.querySelector("#tbody");

const searchInput = document.querySelector("#searchInput");
let keyword = "";

// Lấy ra danh sách các radio có name=status
const categoryStatues = document.querySelectorAll("input[name=status]");
const categoryAddStatus = document.querySelectorAll("input[name=status-add]");
const categoryUpdateStatus = document.querySelectorAll("input[name=status-update]");

// Các phần tử liên quan đến lỗi
const categoryCodeError = document.querySelector("#categoryCodeError");
const categoryNameError = document.querySelector("#categoryNameError");
const messageError = document.querySelector("#message");

// Biến toàn cục
let categoryStatusValue = "active";
let deleteId = null;
let editingId = null; // null = thêm mới | có id = đang sửa

// Lấy dữ liệu từ localStorage
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

// Lắng nghe sự kiện thay đổi khi người dùng chọn trạng thái
categoryUpdateStatues.forEach(function (item) {
    //   Lắng nghe sự kiện khi người dùng change
    item.addEventListener("change", function (event) {
        // Input nào được checked, thì sẽ lấy giá trị của input đó
        if (event.target.checked) {
            categoryStatusValue = event.target.value;
        }
    });
});

// Lắng nghe thay đổi radio trạng thái thêm mới
categoryAddStatus.forEach(function (item) {
    item.addEventListener("change", function (e) {
        if (e.target.checked) categoryStatusValue = e.target.value;
    });
});

// Lắng nghe thay đổi radio trạng thái cập nhật
categoryUpdateStatus.forEach(function (item) {
    item.addEventListener("change", function (e) {
        if (e.target.checked) categoryStatusValue = e.target.value;
    });
});

// Lắng nghe tìm kiếm theo tên
searchInput.addEventListener("input", function (e) {
    keyword = e.target.value.toLowerCase().trim();
    renderCategories();
});

// Hàm mở modal thêm mới/ cập nhật danh mục
function handleShowModal() {
    // Thay đổi style để hiển thị form thêm mới danh mục
    formCategory.style.display = "flex";
}
function handleShowModalUpdate(id) {
    const category = categories.find(item => item.id === id);
    if (!category) return;

    editingId = id;

    updateCodeInput.value = category.code;
    updateNameInput.value = category.name;
    categoryStatusValue = category.status;

    // Thay đổi style để hiển thị form cập nhật
    formUpdateCategory.style.display = "flex";
}
function handleShowModalDelete(id) {
    deleteId = id;
    formDeleteCategory.style.display = "flex";
}

// Hàm đóng modal thêm mới / cập nhật danh mục
function handleCloseModal() {
    // Thay đổi style để ẩn form thêm mới danh mục
    formCategory.style.display = "none";
    formUpdateCategory.style.display = "none";
    formDeleteCategory.style.display = "none";
    resetForm();
}

// Hàm kiểm tra lỗi rỗng, trùng tên dùng chung
function validateCategory(codeValue, nameValue, editingId = null) {
    let isValid = true;

    // Reset lỗi
    categoryCodeError.style.display = "none";
    categoryNameError.style.display = "none";

    // Validate rỗng
    if (!codeValue) {
        categoryCodeError.style.display = "block";
        categoryCodeError.innerHTML = "Mã danh mục không được để trống";
        isValid = false;
    }

    if (!nameValue) {
        categoryNameError.style.display = "block";
        categoryNameError.innerHTML = "Tên danh mục không được để trống";
        isValid = false;
    }

    // Kiểm tra trùng mã, không phân biệt hoa thường, khoảng trống
    const isDuplicateCode = categories.some(item =>
        item.code.toLowerCase() === codeValue.toLowerCase() &&
        item.id !== editingId
    );

    if (isDuplicateCode) {
        categoryCodeError.style.display = "block";
        categoryCodeError.innerHTML = "Mã danh mục đã tồn tại";
        isValid = false;
    }

    // Nếu có lỗi thì dừng
    return isValid;
}

// Hàm submit form
function handleSubmit(event) {
    // Ngăn chặn sự kiện load lại trang
    event.preventDefault();

    const codeValue = categoryCodeInput.value.trim();
    const nameValue = categoryNameInput.value.trim();

    // Validate dữ liệu chung thông qua hàm validateCategory trước đó, kiểm tra xong thì kết thúc hàm bằng return
    if (!validateCategory(codeValue, nameValue, editingId)) return;

    // editing = null thì thêm mới, không thì cập nhật
    if (editingId === null) {
        // Thêm mới, dùng unshift để thêm vào đầu danh sách. 
        // Thêm mới cái object với những giá trị bên dưới vào mảng categories lưu trên local thông qua phương thức unshift
        categories.unshift({
            id: Math.ceil(Math.random() * 10000000),
            code: codeValue,
            name: nameValue,
            status: categoryStatusValue,
        });
    } else {
        //Cập nhật
        // nếu id trong categories ở vị trí thứ i trùng với editingId thì sửa thông tin ở vị trí thứ i, nên cần có 1 biến index để gắn giá trị mới cho id vị trí thứ i
        const index = categories.findIndex(item => item.id === editingId);
        categories[index] = {
            ...categories[index],
            // ...: sao chép toàn bộ thuộc tính cũ của object
            // cập nhật thuộc tính mới của object
            code: codeValue,
            name: nameValue,
            status: categoryStatusValue,
        };
    }

    // Lưu dữ liệu lên local
    localStorage.setItem("categories", JSON.stringify(categories));

    // reset lại form
    resetForm();

    // Đóng form
    handleCloseModal();

    // Render lại danh sách mới nhất
    renderCategories();
}

// Hàm sửa danh mục
function handleEditCategory(event) {
    event.preventDefault();

    const codeValue = categoryCodeInput.value.trim();
    const nameValue = categoryNameInput.value.trim();

    // Validate dữ liệu chung thông qua hàm validateCategory trước đó, kiểm tra xong thì kết thúc hàm bằng return
    if (!validateCategory(codeValue, nameValue, editingId)) return;

    // editing = null thì thêm mới, không thì cập nhật
    if (editingId !== null) {
        //Cập nhật
        // ý tưởng: nếu id trong categories ở vị trí thứ i trùng với editingId thì sửa thông tin ở vị trí thứ i, nên cần có 1 biến index để gắn giá trị mới cho id vị trí thứ i

        const index = categories.findIndex(item => item.id === editingId);
        if (index === -1) return;
        categories[index] = {
            ...categories[index],
            // ...: sao chép toàn bộ thuộc tính cũ của object
            // cập nhật thuộc tính mới của object
            code: codeValue,
            name: nameValue,
            status: categoryStatusValue,
        };
    }

    // Lưu dữ liệu lên local
    localStorage.setItem("categories", JSON.stringify(categories));

    // reset lại form
    resetForm();

    // Đóng form
    handleCloseModal();

    // Render lại danh sách mới nhất
    renderCategories();
}

// Hàm reset lại form sau khi submit
function resetForm() {
    editingId = null;
    deletingId = null;
    categoryCodeInput.value = "";
    categoryNameInput.value = "";
    document.querySelector("input[name=status-add][value=active]").checked = true;
    categoryStatusValue = "active";

    categoryCodeError.style.display = "none";
    categoryNameError.style.display = "none";
}

// Hàm xóa danh mục
function handleDeleteCategory(event) {
    event.preventDefault();

    // Kiểm tra danh mục có sản phẩm hay không
    const hasProduct = products.some(
        product => product.categoryId === deletingId
    );

    if (hasProduct) {
        messageError.innerHTML = "Không thể xóa danh mục vì đang chứa sản phẩm!";
        return;
    }

    categories = categories.filter(item => item.id !== deleteId);
    localStorage.setItem("categories", JSON.stringify(categories));
    deleteId = null;

    handleCloseModal();
    renderCategories();
}

// Hàm render danh sách danh mục
function renderCategories() {
    // Xóa tbody cũ
    tbodyElement.innerHTML = "";

    // Tìm kiếm
    const filteredCategories = categories.filter(category => {
        return (
            category.name.toLowerCase().includes(keyword)
        );
    });

    // Duyệt qua mảng categories
    categories.forEach(function (category) {
        // Convert trạng thái từ tiếng anh sang tiếng việt
        const statusText =
            category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
        // Tạo 1 thẻ tr
        const trElement = document.createElement("tr");

        trElement.innerHTML = `
        <td>${category.code}</td>
        <td>${category.name}</td>
        <td>
            <div class="box-status" checked>
                <div class="dot"></div>
                <span class="status-text">${statusText}</span>
            </div>
        </td>
        <td>
            <button onclick="handleShowModalDelete(${category.id})"><i class="fa-solid fa-trash"></i></button>
            <button onclick="handleShowModalUpdate(${category.id})"><i class="fa-solid fa-pen"></i></button>
        </td>
    `;

        // Gán từng thẻ tr đã có dữ liệu vào trong tbody
        tbodyElement.appendChild(trElement);
    });
}

renderCategories();
