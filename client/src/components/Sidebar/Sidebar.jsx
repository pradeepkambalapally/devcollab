
import {useAuth} from "../../context/AuthContext.jsx"
import { useConversations } from "../../hooks/useConversations.jsx";
import {useOnlineUsers} from "../../hooks/useOnlineUsers.jsx";
import ConversationList from "./ConversationList.jsx";
import SearchSection from "./SearchSection.jsx";
import SidebarHeader from "./SidebarHeader.jsx";

const Sidebar = ({setSelectedConversation, refreshSidebar, selectedConversation}) => {
const {user} = useAuth();
 const {conversations, searchTerm, setSearchTerm, searchResults, handleCreateConversation} = useConversations(refreshSidebar);

 const {onlineUsers} = useOnlineUsers();
   
  return (
    <div className="w-80 border-r border-zinc-800 p-4">
      <SidebarHeader />

      <SearchSection
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  searchResults={searchResults}
  handleCreateConversation={handleCreateConversation}
/>

     <ConversationList
     conversations={conversations}
     user={user}
     onlineUsers={onlineUsers}
     selectedConversation={selectedConversation}
     setSelectedConversation={setSelectedConversation}
     />

    </div>
  );
};

export default Sidebar;