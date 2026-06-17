import { useEffect, useState } from "react";
import { getMessages, sendMessage} from "../services/messageService";
import {socket} from "../socket";

export const useMessages = ( selectedConversation, setRefreshSidebar) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    socket.on("typing", ({senderName}) => {
      console.log("CLIENT GOT TYPING", senderName);

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
        const data = await getMessages(
          selectedConversation._id
        );

        setMessages(data);

      } catch (error) {
        console.log(error.message);
      }
    };

    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [
        ...prev,
        message
      ])
    })

    return () =>{
      socket.off("newMessage");
    }
  },[])

  const handleSendMessage = async (receiverId) => {
    if (!newMessage.trim()) return;

    try {
      const message = await sendMessage(
        selectedConversation._id,
        newMessage
      );

      setMessages(prev => [
        ...prev,
        message,
      ]);

      setNewMessage("");
      socket.emit("stopTyping", {
        receiverId
      });

      setRefreshSidebar(prev => !prev);

    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    isTyping,
    typingUser
  };
};