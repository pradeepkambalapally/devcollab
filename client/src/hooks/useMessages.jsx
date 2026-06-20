import { useEffect, useRef, useState } from "react";
import { getMessages, sendMessage} from "../services/messageService";
import { markMessageAsSeen } from "../services/messageSeenService.js";
import {socket} from "../socket";
import { useMessageSeen } from "./useMessageSeen.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { uploadImage } from "../services/imageService.js";
import toast from "react-hot-toast";


export const useMessages = ( selectedConversation, setRefreshSidebar) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const {user} = useAuth();
  useMessageSeen(selectedConversation, setMessages);

  useEffect(() => {
    socket.on("typing", ({senderName}) => {

      setIsTyping(true);
      setTypingUser(senderName);
    })

    socket.on("stopTyping", () => {
      setIsTyping(false);
      setTypingUser("");
    })

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    }
  }, [])


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedConversation) return;
        const data = await getMessages(
          selectedConversation._id
        );

        setMessages(data);
        await markMessageAsSeen(selectedConversation._id);
       

      } catch (error) {
        toast.error("Couldn't load messages");
        throw error;
      }
    };

    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    socket.on("newMessage", async (message) => {
       if (message.conversation !== selectedConversation?._id) {
        return;
       }
       setMessages((prev) => [...prev, message]);
       if(message.sender._id !== user._id && !message.seen){
        await markMessageAsSeen(message.conversation);
       }
       
    })

    return () =>{
      socket.off("newMessage");
    }
  },[selectedConversation, user])

  const handleSendMessage = async (receiverId) => {
    if (!newMessage.trim() && !selectedImage) return;

    try {
      let attachment = null;
      if(selectedImage){

        const uploadedImage = await uploadImage(selectedImage);
        attachment = {
          url : uploadedImage.data.url,
          publicId : uploadedImage.data.public_id,
          fileName : selectedImage.name,
          fileType : selectedImage.type,
        };
        
      }
        const message = await sendMessage(
        selectedConversation._id,
        newMessage,
        attachment
      );

      setMessages(prev => [
        ...prev,
        message,
      ]);

      setNewMessage("");
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedImage(null);
      setImagePreview("");


    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
      socket.emit("stopTyping", {
        receiverId
      });

      setRefreshSidebar(prev => !prev);
      
      

    } catch (error) {
      toast.error("Failed to send message.");
      throw error
      
    }
  };

  return {
messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isTyping,
  typingUser,
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview,
  fileInputRef,
  };
};