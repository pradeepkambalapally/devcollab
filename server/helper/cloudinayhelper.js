const cloudinary = require("../config/cloudinary");

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);

        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
};
module.exports = {
    uploadImage,
};