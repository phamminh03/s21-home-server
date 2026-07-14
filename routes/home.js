const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.send("Đây là Home Route");

});

module.exports = router;
