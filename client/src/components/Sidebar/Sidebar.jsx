import { useAuth } from "../../context/AuthContext.jsx";
import { useConversations } from "../../hooks/useConversations.jsx";
import { useOnlineUsers } from "../../hooks/useOnlineUsers.jsx";

import SidebarHeader from "./SidebarHeader.jsx";
import SearchSection from "./SearchSection.jsx";
import ConversationList from "./ConversationList.jsx";

const Sidebar = ({
  setSelectedConversation,
  refreshSidebar,
  selectedConversation,
}) => {
  const { user } = useAuth();

  const {
    conversations,
    searchTerm,
    setSearchTerm,
    searchResults,
    handleCreateConversation,
  } = useConversations(refreshSidebar);

  const { onlineUsers } = useOnlineUsers();

  return (
    <aside className="flex flex-col h-full w-full bg-zinc-950 border-r border-zinc-800">

      {/* Fixed Header */}
      <div className="p-4 md:p-6 border-b border-zinc-800">

        <SidebarHeader />

        <div className="mt-5">
          <SearchSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
            handleCreateConversation={handleCreateConversation}
          />
        </div>

      </div>

      {/* Scrollable Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">

        <ConversationList
          conversations={conversations}
          user={user}
          onlineUsers={onlineUsers}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />

      </div>

    </aside>
  );
};

export default Sidebar;