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
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef(null);
  const {user} = useAuth();
  const sendingRef = useRef(false);
  useMessageSeen(selectedConversation, setMessages);

 useEffect(() => {
  const handleTyping = ({ senderName }) => {
    setIsTyping(true);
    setTypingUser(senderName);
  };

  const handleStopTyping = () => {
    setIsTyping(false);
    setTypingUser("");
  };

  socket.on("typing", handleTyping);
  socket.on("stopTyping", handleStopTyping);

  return () => {
    socket.off("typing", handleTyping);
    socket.off("stopTyping", handleStopTyping);
  };
}, []);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedConversation) return;
        const data = await getMessages(
          selectedConversation._id
        );

        setMessages(data);
        await markMessageAsSeen(selectedConversation._id);
        setRefreshSidebar(prev => !prev);
       

      } catch (error) {
        toast.error("Couldn't load messages");
        throw error;
      }
    };

    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation, setRefreshSidebar]);

useEffect(() => {
  const handleNewMessage = async (message) => {
    const conversationId =
      typeof message.conversation === "object"
        ? message.conversation._id
        : message.conversation;

    if (conversationId !== selectedConversation?._id) return;
    setMessages(prev => {
      if (prev.some(m => m._id === message._id)) {
        return prev;
      }
      return [...prev, message];
    });

    if (message.sender._id !== user._id && !message.seen) {
      await markMessageAsSeen(conversationId);
      setRefreshSidebar(prev => !prev);
    }
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [selectedConversation, user, setRefreshSidebar]);

  const handleSendMessage = async (receiverId) => {
    if(sendingRef.current) return;
    if (!newMessage.trim() && !selectedImage) return;
    sendingRef.current = true;
    setSending(true);

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
      
    }finally{
      sendingRef.current = false;
      setSending(false);
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
  sending
  };
};