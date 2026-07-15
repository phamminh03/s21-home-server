
const sidebar =
document.getElementById("sidebar");

const main =
document.querySelector(".main");

const toggle =
document.getElementById("toggleSidebar");
const closeBtn =
document.getElementById("closeSidebar");
const content =
document.getElementById("content");

toggle.onclick = () => {

    if(window.innerWidth <= 768){

        sidebar.classList.toggle("open");

    }else{

        sidebar.classList.toggle("close");

        main.classList.toggle("full");

    }

};
closeBtn.onclick = () => {

    sidebar.classList.remove("open");

};


// Dashboard

async function loadDashboard(){

    const response =
    await fetch("/api/products");

    const products =
    await response.json();

    content.innerHTML = `

    <div class="card">

        <h2>Tổng sản phẩm</h2>

        <h1>${products.length}</h1>

    </div>

    `;

}

// Trang sản phẩm

async function loadProducts(){

    const response =
    await fetch("/api/products");

    const products =
    await response.json();

    let html = `

    <div class="top-action">

        <h2>Quản lý sản phẩm</h2>

        <button id="btnAdd">

            + Thêm sản phẩm

        </button>

    </div>

    <table>

        <thead>

            <tr>

                <th>Ảnh</th>

                <th>Tên</th>

                <th>Giá</th>

                <th>Thao tác</th>

            </tr>

        </thead>

        <tbody>

    `;

    products.forEach(product=>{

        html += `

        <tr>

            <td>

                <img
                src="${product.image}"
                class="thumb">

            </td>

            <td>${product.name}</td>

            <td>

            ${product.price.toLocaleString("vi-VN")}đ

            </td>

            <td>

<button
class="edit-btn"
data-id="${product.id}">

✏️

</button>
<button
class="delete-btn"
data-id="${product.id}">

🗑️

</button>
            </td>

        </tr>

        `;

    });

    html += `

        </tbody>

    </table>

    `;

    content.innerHTML = html;
document
.querySelectorAll(".edit-btn")
.forEach(btn=>{

    btn.onclick = async()=>{

        const response =
        await fetch("/api/products");

        const products =
        await response.json();

        const product =
        products.find(p=>p.id==btn.dataset.id);

        document
        .getElementById("productId").value =
        product.id;

        document
        .getElementById("name").value =
        product.name;

        document
        .getElementById("description").value =
        product.description;

        document
        .getElementById("price").value =
        product.price;

        const preview =
        document.getElementById("preview");

        preview.src =
        product.image;

        preview.style.display =
        "block";

        document
        .querySelector(
        ".modal-box h2")
        .textContent =
        "Sửa sản phẩm";

        document
        .querySelector(
        ".modal-actions button[type='submit']")
        .textContent =
        "Cập nhật";

        document
        .getElementById("image")
        .required = false;
document.querySelector(".modal-box h2").textContent = "Thêm sản phẩm";

document.querySelector(".modal-actions button[type='submit']").textContent = "Lưu sản phẩm";

document.getElementById("productId").value = "";

document.getElementById("image").required = true;
        modal.classList.add("show");

    };

});

document
.querySelectorAll(".delete-btn")
.forEach(btn=>{

btn.onclick=async()=>{

const ok=confirm(
"Bạn có chắc muốn xóa sản phẩm này?"
);

if(!ok) return;

await fetch(

"/api/products/"+btn.dataset.id,

{

method:"DELETE"

}

);

loadProducts();

};

});

document.getElementById("btnAdd").onclick=()=>{

    document
        .getElementById("productModal")
        .classList
        .add("show");

};
}

loadDashboard();

document
.getElementById("menuProducts")
.onclick = loadProducts;
document.addEventListener("click",(e)=>{

    if(window.innerWidth>768) return;

    if(
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
    ){

        sidebar.classList.remove("open");

    }

});
const modal =
document.getElementById("productModal");

document
.getElementById("closeModal")
.onclick=()=>{

    modal.classList.remove("show");

};

document
.getElementById("image")
.onchange = e => {

    const file = e.target.files[0];

    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();

    const allow = ["jpg", "jpeg", "png"];

    if (!allow.includes(ext)) {

        alert("Chỉ được tải lên ảnh JPG, JPEG hoặc PNG.\nẢnh HEIC hiện chưa được hỗ trợ.");

        e.target.value = "";

        document.getElementById("preview").style.display = "none";

        return;

    }

    const reader = new FileReader();

    reader.onload = () => {

        const img = document.getElementById("preview");

        img.src = reader.result;

        img.style.display = "block";

    };

    reader.readAsDataURL(file);

};

document
.getElementById("productForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

const imageInput = document.getElementById("image");

const imageFile = imageInput.files[0];

let imagePath;

// Có chọn ảnh mới
if(imageFile){

    const formData = new FormData();

    formData.append("image", imageFile);

    const uploadResponse = await fetch("/api/upload",{

        method:"POST",

        body:formData

    });

    const upload = await uploadResponse.json();

    imagePath = upload.image;

}else{

    // Nếu đang sửa thì giữ ảnh cũ

    if(document.getElementById("productId").value){

        imagePath =
        document.getElementById("preview").src.replace(location.origin,"");

    }else{

        alert("Vui lòng chọn ảnh.");

        return;

    }

}
    // Lưu sản phẩm
const name = document.getElementById("name").value;

const description = document.getElementById("description").value;

const price = document.getElementById("price").value;


const id = document.getElementById("productId").value;

let response;

if(id){

    response = await fetch("/api/products/"+id,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            name,

            description,

            price,

            image:imagePath

        })

    });

}else{

    response = await fetch("/api/products",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            name,

            description,

            price,

            image:imagePath

        })

    });

}
    if (!response.ok) {

        alert("Không thể lưu sản phẩm.");

        return;

    }

    alert("Đã thêm sản phẩm thành công!");

    modal.classList.remove("show");

    document.getElementById("productForm").reset();
document.getElementById("productId").value="";

document.getElementById("preview").src="";

document.getElementById("preview").style.display="none";
    document.getElementById("preview").style.display = "none";

    loadProducts();

});


