async function loadCompany() {

    const response = await fetch("/api/company");
    const company = await response.json();

    document.getElementById("companyName").textContent =
        company.name;

    document.getElementById("companyDescription").textContent =
        company.description;

}

async function loadProducts() {

    const response = await fetch("/api/products");
    const products = await response.json();

    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `

        <div class="product-card">

            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-price">
                    ${product.price.toLocaleString("vi-VN")}đ
                </div>

                <button class="buy-btn">
                    Xem chi tiết
                </button>

            </div>

        </div>

        `;

    });

}

loadCompany();
loadProducts();
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.onclick = () => {
    mobileMenu.classList.add("active");
};

closeMenu.onclick = () => {
    mobileMenu.classList.remove("active");
};
