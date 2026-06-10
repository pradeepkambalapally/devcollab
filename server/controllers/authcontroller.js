
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "Username already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            password : hashedPassword,
            email
        })

        await newUser.save();

        res.status(201).json({
            success : true,
            message : "User registered successfully"
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Error registering user",
            error : error.message
        })
    }
}

const login = async (req, res) => {
    const {username, email, password} = req.body;
    try{

        if(!username || !password){
            return res.status(400).json({
                success : false,
                message : "Please provide username and password"
            })
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User not found"
            })
        }

        const isPassWordMatch = await bcrypt.compare(password, user.password);

        if(!isPassWordMatch){
            return res.status(401).json({
                success : false,
                message  : "Invalid Password"
            })
        }

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {
            expiresIn : '7d'
        })

        res.status(200).json({
            success : true,
            message : "User logged in successfully",
            token : token
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Error logging in",
            error : error.message
        })
    }
}

module.exports = {
    register,
    login
}
