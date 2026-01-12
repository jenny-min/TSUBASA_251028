const productElement = document.querySelector("#products");
const productInfoElement = document.querySelector("#product-info");
console.log("productInfoElement", productInfoElement);

// Hàm trả render sản phẩm (fix cứng dữ liệu)
function renderProducts(e) {
    const products = [
        {
            id: "1",
            product_code: "SP001",
            product_name: "Apple iPhone 14 Pro Max 128GB Deep Purple ",
            category_id: 1,
            stock: 100,
            price: 900,
            discount: 0,
            image: "../utils/images/product_manager_images/products/Iphone-14-pro-1.png",
            status: "ACTIVE",
            description: "",
        },
        {
            id: "2",
            product_code: "SP002",
            product_name: "Blackmagic Pocket Cinema Camera 6k",
            category_id: 2,
            stock: 100,
            price: 2535,
            discount: 0,
            image: "../utils/images/product_manager_images/products/Blackmagic-Pocket-Cinema-Camera-6k.png",
            status: "ACTIVE",
            description: "",
        },
        {
            id: "3",
            product_code: "SP003",
            product_name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
            category_id: 3,
            stock: 100,
            price: 399,
            discount: 0,
            image: "../utils/images/product_manager_images/products/Apple-Watch-Series-9.png",
            status: "ACTIVE",
            description: "",
        },
        {
            id: "4",
            product_code: "SP004",
            product_name: "AirPods Max Silver",
            category_id: 4,
            stock: 100,
            price: 549,
            discount: 0,
            image: "../utils/images/product_manager_images/products/AirPods-Max.png",
            status: "ACTIVE",
            description: "",
        },
        {
            id: "5",
            product_code: "SP005",
            product_name: "Samsung Galaxy Watch6 Classic 47mm Black",
            category_id: 5,
            stock: 100,
            price: 369,
            discount: 0,
            image: "../utils/images/product_manager_images/products/Samsung-Galaxy-Watch6-Classic.png",
            status: "ACTIVE",
            description: "",
        },

        {
            id: "6",
            product_code: "SP006",
            product_name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
            category_id: 6,
            stock: 100,
            price: 1799,
            discount: 0,
            image: "../utils/images/product_manager_images/products/GalaxyZ-Fold5-Phantom.png",
            status: "ACTIVE",
            description: "",
        },
        {
            id: "7",
            product_code: "SP007",
            product_name: "Galaxy Buds FE Graphite",
            category_id: 7,
            stock: 100,
            price: 99.99,
            discount: 0,
            image: "../utils/images/product_manager_images/products/Galaxy-Buds-FE-Graphite.png",
            status: "ACTIVE",
            description: "",
        },
        {
            id: "8",
            product_code: "SP008",
            product_name: "Apple iPad 9 10.2 64GB Wi-Fi Silver (MK2L3) 2021",
            category_id: 8,
            stock: 100,
            price: 398,
            discount: 0,
            image: "../utils/images/product_manager_images/products/Apple-iPad-9.png",
            status: "ACTIVE",
            description: "",
        },
    ];

    const divElement = document.createElement("div");

    let productInfoElement = `
        <div class="product-card">
            <span class="wishlist"><i class="fa-regular fa-heart"></i></span>
            `;
    divElement.innerHTML =
        productInfoElement +=

        // Duyệt qua mảng products
        products.forEach(function (item) {
            productInfoElement += `<div id="product-info">
            <img
              class="product-img"
              src="${item.image}"
              alt="${item.description}"
            />

            <h3 class="product-description">
              ${item.product_name}
            </h3>
            <p class="product-price">$${item.price}</p>
            </div>
        `
        });


    productInfoElement +=
        `<button class="btn-semi-black">Mua ngay</button>
          </div>
        `

    // Gán từng thẻ tr đã có dữ liệu vào trong tbody
    productElement.appendChild(divElement);
}

