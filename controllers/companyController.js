const fs = require("fs");
const path = require("path");

function getCompany(req, res) {

    const filePath = path.join(__dirname, "..", "database", "company.json");

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {

            return res.status(500).json({
                message: "Không đọc được dữ liệu."
            });

        }

        res.json(JSON.parse(data));

    });

}

module.exports = {

    getCompany

};
