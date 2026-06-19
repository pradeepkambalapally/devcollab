
const {getIo, onlineUsers} = require('../socket');
const Message = require("../models/Message");
const Conversation = require('../models/Conversation');
const markMessagesAsSeen = async (req, res) => {

    try{
        const {conversationId} = req.params;
        await Message.updateMany({
            conversation : conversationId,
            sender : {$ne : req.user._id},
            seen : false
        },{
            $set : {
                seen : true,
            }
        });
        

        const conversation = await Conversation.findById(conversationId);

        const senderId = conversation.participants.find((participant) =>
        participant.toString() !== req.user._id.toString());

        const senderSocketId = onlineUsers[senderId];

        const io = getIo();

        if(senderSocketId){
            console.log("Sending messageSeen to:", senderSocketId);
            io.to(senderSocketId).emit("messageSeen", {
                conversationId
            })
        }

        res.status(200).json({
            message : "Message marked as seen"
        });

    }catch(error){
        return res.status(501).json({
            message : error.message
        })
    }
}

module.exports = {
    markMessagesAsSeen
}