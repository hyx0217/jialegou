const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storageImg = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../uploadFile/images/")); //存放图片的路径，许
  },
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(
      null,
      Date.now() +
        Math.floor(Math.random() * 1000) +
        "." +
        fileFormat[fileFormat.length - 1]
    );
  }
});

const uploadImg = multer({ storage: storageImg });

router.post("/singleImg", uploadImg.single("img"), function(req, res) {
  let filename = req.file.filename;
  let host = "http://localhost:3000";
  let url=host + "/uploadFile/images/" + filename;
  res.send(url);
});

module.exports = router;
