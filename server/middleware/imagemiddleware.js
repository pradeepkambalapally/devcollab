const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname, "../images"));
    },
    filename : function (req, file, cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        ];
    if(allowedTypes.includes(file.mimetype)){
    cb(null, true)
  }else{
    cb(new Error('Unsupported file type. Only JPEG, PNG, and JPG are allowed.'), false)
  }
}

const uploadLimits = {
        fileSize : 1024 * 1024 * 8
}

const upload = multer({storage : storage, fileFilter : fileFilter, limits : uploadLimits});

module.exports = {
    upload
}