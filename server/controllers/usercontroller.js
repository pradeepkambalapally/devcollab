
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

module.exports = {
    searchUsers
}