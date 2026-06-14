import { useEffect, useState } from "react";
import {
  getConversations,
  createConversation,
} from "../services/conversationService";

import {
  searchUsers,
} from "../services/userService";

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
      console.log(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConversations();
  }, [refreshSidebar]);

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