import { useEffect, useState } from "react";
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
  refreshSidebar
) => {

  const [conversations, setConversations] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const fetchConversations = async () => {
    try {
      const data =
        await getConversations();

      setConversations(data);

    } catch (error) {
      toast.error("Couldn't create conversation");
      throw error
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConversations();
  }, [refreshSidebar]);

  useEffect(() => {
  socket.on("newMessage", () => {
    fetchConversations();
  });

  return () => {
    socket.off("newMessage");
  };
}, []);

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

  const handleCreateConversation =
    async (receiverId) => {
      try {

        await createConversation(
          receiverId
        );

        fetchConversations();

        setSearchTerm("");
        setSearchResults([]);

      } catch (error) {
        console.log(error.message);
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