const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "database", "products.json");

// Lấy danh sách sản phẩm
function getProducts(req, res) {

    fs.readFile(file, "utf8", (err, data) => {

        if (err) {

            return res.status(500).json({
                message: "Không đọc được products.json"
            });

        }

        res.json(JSON.parse(data));

    });

}

// Thêm sản phẩm
function addProduct(req, res) {

    fs.readFile(file, "utf8", (err, data) => {

        if (err) {

            return res.status(500).json({
                message: "Không đọc được products.json"
            });

        }

        const products = JSON.parse(data);

        const product = {

            id: Date.now(),

            name: req.body.name,

            description: req.body.description,

            price: Number(req.body.price),

            image: req.body.image

        };

        products.push(product);

        fs.writeFile(

            file,

            JSON.stringify(products, null, 4),

            (err) => {

                if (err) {

                    return res.status(500).json({
                        message: "Không lưu được sản phẩm"
                    });

                }

                res.json({
                    success: true,
                    product
                });

            }

        );

    });

}
function deleteProduct(req, res) {

    const id = Number(req.params.id);

    fs.readFile(file, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Không đọc được products.json"
            });
        }

        let products = JSON.parse(data);

        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }

        // Xóa file ảnh (nếu có)
        const imagePath = path.join(
            __dirname,
            "..",
            "public",
            product.image.replace("/","")
        );

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        products = products.filter(p => p.id !== id);

        fs.writeFile(
            file,
            JSON.stringify(products,null,4),
            () => {

                res.json({
                    success:true
                });

            }
        );

    });

}

function updateProduct(req, res) {

    const id = Number(req.params.id);

    fs.readFile(file, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Không đọc được products.json"
            });
        }

        const products = JSON.parse(data);

        const index = products.findIndex(p => p.id === id);

        if (index === -1) {

            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });

        }

        products[index] = {

            ...products[index],

            name: req.body.name,

            description: req.body.description,

            price: Number(req.body.price),

            image: req.body.image || products[index].image

        };

        fs.writeFile(

            file,

            JSON.stringify(products, null, 4),

            err => {

                if (err) {

                    return res.status(500).json({
                        message: "Không lưu được"
                    });

                }

                res.json({

                    success: true

                });

            }

        );

    });

}

module.exports = {

    getProducts,

    addProduct,

    updateProduct

};
