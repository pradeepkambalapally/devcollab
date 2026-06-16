import { useEffect, useState } from "react";
import { getMessages, sendMessage} from "../services/messageService";
import {socket} from "../socket";

export const useMessages = ( selectedConversation, setRefreshSidebar) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
      console.log("SOCKET MESSAGE", message);
      setMessages((prev) => [
        ...prev,
        message
      ])
    })

    return () =>{
      socket.off("newMessage");
    }
  },[])

  const handleSendMessage = async () => {
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
  };
};