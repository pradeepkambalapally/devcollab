const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const { uploadImageController } = require("../controllers/imagecontroller");
const {upload} = require('../middleware/imagemiddleware')

router.post("/upload", authMiddleware, upload.single("image"), uploadImageController);

module.exports = router;