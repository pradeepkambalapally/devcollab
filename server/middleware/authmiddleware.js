
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success : false,
            message : "Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token is missing"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        if (!req.user) {
    return res.status(401).json({
        success: false,
        message: "User not found"
    });
}
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Invalid token",
            error : error.message
        })

    }
}

module.exports = authMiddleware;