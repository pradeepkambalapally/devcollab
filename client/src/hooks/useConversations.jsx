import { useCallback, useEffect, useState } from "react";
import {socket} from "../socket";
import {
  getConversations,
  createConversation,
} from "../services/conversationService";

import {
  searchUsers,
} from "../services/userService";
import toast from "react-hot-toast";

export const useConversations = (
  refreshSidebar,
  setSelectedConversation
) => {

  const [conversations, setConversations] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

const fetchConversations = useCallback(async () => {
  try {
    const data = await getConversations();

    setConversations(data);

    return data;
  } catch (error) {
    toast.error("Couldn't load conversations");
    throw error;
  }
}, []);

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchConversations();
}, [fetchConversations, refreshSidebar]);

useEffect(() => {
  const handleNewMessage = () => {
    fetchConversations();
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [fetchConversations]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const data =
          await searchUsers(searchTerm);

        setSearchResults(data);

      } catch (error) {
        console.log(error.message);
      }
    };

    if (searchTerm.trim()) {
      fetchSearchResults();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([]);
    }
  }, [searchTerm]);
const handleCreateConversation = async (receiverId) => {
  try {
    const createdConversation = await createConversation(receiverId);

    const updatedConversations = await fetchConversations();

    const selected = updatedConversations.find(
      (conversation) => conversation._id === createdConversation._id
    );

    if (selected) {
      setSelectedConversation(selected);
    }

    setSearchTerm("");
    setSearchResults([]);
  } catch (error) {
    console.log(error.message);
    toast.error("Couldn't create conversation");
  }
};

  return {
    conversations,
    searchTerm,
    setSearchTerm,
    searchResults,
    handleCreateConversation,
  };
};