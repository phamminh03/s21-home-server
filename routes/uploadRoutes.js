const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"public/images");

    },

    filename:(req,file,cb)=>{

        const ext = path.extname(file.originalname);

        cb(null,Date.now()+ext);

    }

});

const upload = multer({storage});

router.post("/",upload.single("image"),(req,res)=>{

    res.json({

        success:true,

        image:"/images/"+req.file.filename

    });

});

module.exports = router;
