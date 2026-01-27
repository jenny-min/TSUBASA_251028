// Khai báo danh mục sách
let books = [];

// Thêm sách mới
function addBook() {
    let bookName = prompt("Nhập tên sách:");
    let authorName = prompt("Nhập tên tác giả:");
    let pubYear = Number(prompt("Nhập năm xuất bản:"));
    let id = prompt("Nhập mã số sách:");

    // Tạo object sách
    let book = {
        id: id,
        bookName: bookName,
        authorName: authorName,
        pubYear: pubYear
    };

    books.push(book);
    alert("Thêm sách thành công!");
}

// Hiển thị danh sách sách
function showBooks() {
    if (books.length === 0) {
        alert("Thư viện trống!!");
        return;
    }

    let list = "--- DANH SÁCH SÁCH ---\n";
    for (let b of books) {
        list += `ID: ${b.id}, Tên sách: ${b.bookName}, Tên tác giả ${b.authorName}, Năm xuất bản ${b.pubYear}\n`;
    }
    alert(list);
}
// Tìm kiếm sách theo tên

function searchBook() {
    let keyword = prompt("Nhập tên sách cần tìm");

    let result = books.filter(b => b.bookName.toLowerCase().includes(keyword.toLowerCase()));

    if (result.length === 0) {
        alert("Không tìm thấy sách phù hợp!");
    } else {
        let list = "--- KẾT QUẢ TÌM KIẾM ---\n";
        for (let b of result) {
            list += `ID: ${b.id}, Tên: ${b.bookName}, Tác giả: ${b.authorName}, Năm XB: ${b.pubYear}\n`;
        }
        alert(list);
    }
}
// Xóa sách theo ID
function deleteBook() {
    let id = prompt("Nhập ID sách cần xóa:");
    let index = books.findIndex(b => b.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        alert("Xóa sách thành công!");
    } else {
        alert("Không tìm thấy sách có ID này!");
    }
}

// Chạy menu
function menu() {
    let choice;
    do {
        choice = prompt(
            "--- QUẢN LÝ SÁCH ---\n" +
            "1. Thêm sách mới\n" +
            "2. Hiển thị danh sách sách\n" +
            "3. Tìm kiếm sách theo tên\n" +
            "4. Xóa sách theo ID\n" +
            "5. Thoát chương trình\n" +
            "Nhập lựa chọn của bạn:"
        );

        switch (choice) {
            case "1":
                addBook();
                break;
            case "2":
                showBooks();
                break;
            case "3":
                searchBook();
                break;
            case "4":
                deleteBook();
                break;
            case "5":
                alert("Thoát chương trình");
            default:
                alert("Lựa chọn không hợp lệ, vui lòng nhập lại");
                break;
        }
    } while (choice !== "5");
}

menu();