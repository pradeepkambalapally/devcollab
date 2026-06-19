
const {uploadImage} = require('../helper/cloudinayhelper')
const Image = require('../models/Image');
const fs = require("fs/promises");

const uploadImageController = async (req, res) => {
    try{

        if(!req.file){
            return res.status(400).json({
                success : false,
                message : "No file uploaded",
            })
        }

        const {url, public_id} = await uploadImage(req.file.path);
        const newImage = new Image({
            url,
            public_id,
            uploadedBy : req.user._id
        })
        await newImage.save();
        await fs.unlink(req.file.path);
        res.status(200).json({
            success : true,
            message : "Image uploaded Successfully",
            data : newImage
        })
    }catch(error){
    return res.status(500).json({
        message: error.message,
    });
    }
}

module.exports = {
    uploadImageController
}