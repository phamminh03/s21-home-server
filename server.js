const express = require("express");
const multer = require("multer");
const session = require("express-session");
const path = require("path");

const app = express();

// Cho phép đọc dữ liệu JSON gửi từ trình duyệt
app.use(express.json());
app.use(session({
    secret: "S21FE_Server_2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Phục vụ các file trong thư mục public
app.use(express.static("public"));

// Cấu hình upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Upload file
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({
        success: true,
        message: "Upload thành công"
    });
});

// ===== ĐĂNG NHẬP =====
const PASSWORD = "140623";

function checkLogin(req, res, next) {

    if (req.session.loggedIn) {
        return next();
    }

    res.status(401).send("Bạn chưa đăng nhập.");

}

app.post("/login", (req, res) => {

    const { password } = req.body;

    if (password === PASSWORD) {

        req.session.loggedIn = true;

        return res.json({
            success: true
        });

    }

    res.status(401).json({
        success: false,
        message: "Sai mật khẩu"
    });

});

app.get("/home", checkLogin, (req, res) => {

    res.sendFile(path.join(__dirname, "public", "home.html"));

});

app.get("/admin", checkLogin, (req, res) => {

    res.sendFile(path.join(__dirname, "public", "admin.html"));

});

app.post("/logout", (req, res) => {

    req.session.destroy(() => {

        res.json({
            success: true
        });

    });

});

// Khởi động server
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running");
});
