// Hàm trả về chuỗi HTML của aside
function renderAside(keyActive) {
    // Mảng danh sách các link trong aside
    const asideItems = [
        {
            key: "dashboard",
            name: "Thống kê",
            link: "../pages/dashboard.html",
            icon: '<i class="fa-solid fa-house"></i>',
        },
        {
            key: "manager-category",
            name: "Quản lý danh mục",
            link: "../pages/category_manager.html",
            icon: '<i class="fa-solid fa-money-bills"></i>',
        },
        {
            key: "manager-product",
            name: "Quản lý sản phẩm",
            link: "../pages/product_manager.html",
            icon: '<i class="fa-solid fa-folder"></i>',
        }
    ];

    // Nối chuỗi HTML trong aside
    let asideHTML = `
    <div class="aside-header">
        <img src="../utils/icons/ecommerce.png" alt="" >
    </div>
    <div class="aside-body">
    `;

    // Nối chuỗi kèm theo sử lý logic và gắn các dữ liệu động
    asideItems.forEach(function (item) {
        asideHTML += `
        <a href="${item.link}" class="aside-list ${keyActive === item.key ? "aside-active" : ""}">
            ${item.icon}
            <p class="list-item">${item.name}</p>
          </a>
        `;
    });

    asideHTML += `</div>`

    return asideHTML;
}