const Conversation = require('../models/Conversation');
const Message = require("../models/Message");

const sendMessage = async (req, res) => {
    try{
        const {conversationId, text} = req.body;
        
        if(!conversationId || !text){
            return res.status(400).json({message: "conversationId and text are required"});
        }

        const message = await Message.create({
            conversation : conversationId,
            sender : req.user._id,
            text
        })

        await Conversation.findByIdAndUpdate(conversationId, 
            {lastMessage : message._id}
        )
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

const getMessages = async (req, res) => {
    try{
        const {conversationId} = req.params;

        const messages = await Message.find({
            conversation  : conversationId,

        }).populate('sender', 'username email');

        res.status(200).json(messages);
    }catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    sendMessage,
    getMessages
}