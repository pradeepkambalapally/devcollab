const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');
const { uploadImageController } = require("../controllers/imagecontroller");
const {upload} = require('../middleware/imagemiddleware')

router.post("/upload", authmiddleware, upload.single("image"), uploadImageController);

module.exports = router;