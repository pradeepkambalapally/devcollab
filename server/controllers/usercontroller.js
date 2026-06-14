
const User = require('../models/User');


const searchUsers = async (req, res) => {
    try{
        const query = req.query.q ||"";
        const users = await User.find({
            username : {
                $regex : query,
                $options : "i",
            },
            _id : {
                $ne : req.user._id
            }
        }).select('-password');

        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateProfile = async (req, res) => {
    try{
        const {bio, skills, github, avatar} = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {
            bio,
            skills,
            github,
            avatar
        },
        {new : true}
        ).select("-password");
        res.status(200).json(user);
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const getProfile  = async(req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {
    searchUsers,
    updateProfile,
    getProfile
}