
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Conversation",
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    text : {
        type : String,
        default : "",
    },
    seen : {
        type : Boolean,
        default : false
    },
    attachment: {
    url: {
        type: String,
        default: "",
        trim : true,
    },
    publicId: {
        type: String,
        default: "",
    },
    fileType: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
   },
}, {
    timestamps : true
})

module.exports = mongoose.model('Message', messageSchema);