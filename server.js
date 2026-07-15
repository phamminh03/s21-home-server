const express = require("express");
const path = require("path");
const session = require("express-session");
const uploadRoutes = require("./routes/uploadRoutes");
const companyRoutes = require("./routes/companyRoutes");
const productRoutes = require("./routes/productRoutes");

const { requireLogin } = require("./middleware/auth");

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/upload",uploadRoutes);

app.use(session({
    secret: "abcdecor_secret_key",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/company", companyRoutes);
app.use("/api/products", productRoutes);

/* =========================
   WEBSITE
========================= */

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "index.html"));

});

/* =========================
   LOGIN
========================= */

app.get("/login", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "login.html"));

});

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "123456") {

        req.session.loggedIn = true;

        return res.redirect("/admin");

    }

    res.send("Sai tài khoản hoặc mật khẩu.");

});

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

});

/* =========================
   ADMIN
========================= */

app.get("/admin", requireLogin, (req, res) => {

    res.sendFile(path.join(__dirname, "views", "admin.html"));

});

app.listen(PORT, "0.0.0.0", () => {

    console.log(`ABC Decor running at http://0.0.0.0:${PORT}`);

});
