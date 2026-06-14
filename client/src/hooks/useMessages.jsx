import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage,
} from "../services/messageService";

export const useMessages = (
  selectedConversation,
  setRefreshSidebar
) => {
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