const Conversation = require('../models/Conversation');
const Message = require("../models/Message");
const {getIo, onlineUsers} = require('../socket')

const sendMessage = async (req, res) => {
    try{
        const {conversationId, text, attachment} = req.body;
        
        if(!conversationId || (!text && !attachment)){
            return res.status(400).json({message: "Message must contain text or an attachment"});
        }

        const message = await Message.create({
            conversation : conversationId,
            sender : req.user._id,
            text,
            attachment
        })

        await Conversation.findByIdAndUpdate(conversationId, 
            {
                lastMessage : message._id,
                updatedAt: new Date(),
            }
        )
        
        const conversation = await Conversation.findById(conversationId);

        


        const receiverId = conversation.participants.find((participant) => participant.toString() !== req.user._id.toString());
        
      

        const receiverSocketId = onlineUsers[receiverId];

        const io = getIo();

        const populatedMessage = await Message.findById(message._id).populate("sender", "username email");

        if(receiverSocketId){
            io.to(receiverSocketId).emit(
                "newMessage", populatedMessage
            )
        }
        res.status(201).json(populatedMessage);
    }catch (error) {
    console.log(error.message);
    console.log(error.stack);

    res.status(500).json({
        message: error.message
    });
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