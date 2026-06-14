
const Conversation = require('../models/Conversation');
const Message = require("../models/Message");

const createConversation = async (req, res) => {
    try{
        const {receiverId} = req.body;

        const existingConversation = await Conversation.findOne({
            participants : {
                $all : [req.user._id, receiverId]
            }
        });
        if(existingConversation){
            return res.status(200).json(existingConversation);
        }

        const newConversation = await Conversation.create({
            participants : [req.user._id, receiverId]
        })

        res.status(201).json(newConversation);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message
            
        });
    }
}

const getConversations = async (req, res) => {
    try{
        const conversations = await Conversation.find({
            participants : req.user._id
        }).populate('participants', 'username email avatar bio skills github').populate('lastMessage');

        res.status(200).json(conversations);
    }catch(error){
        return res.status(500).json({message: error.message
        });
    }
}

module.exports = {
    createConversation,
    getConversations
}