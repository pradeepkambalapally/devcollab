
import {useAuth} from "../context/AuthContext.jsx"
import { Link } from "react-router-dom";
import { useConversations } from "../hooks/useConversations.jsx";

const Sidebar = ({setSelectedConversation, refreshSidebar, selectedConversation}) => {
const {user} = useAuth();
 const {conversations, searchTerm, setSearchTerm, searchResults, handleCreateConversation} = useConversations(refreshSidebar);
   
  return (
    <div className="w-80 border-r border-zinc-800 p-4">
      <h2 className="text-xl font-bold text-white mb-4">
        DevCollab
      </h2>
      <Link to="/profile" className="block mb-4 p-2 rounded bg-zinc-800 text-center">
      Edit Profile
      </Link>

      <input
      type="text"
      placeholder="Search users..."
      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-blue-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
     {
    searchResults.map((user) => (
    <div
      key={user._id}
      className="p-3 mt-2 rounded-lg bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition"
      onClick={() => handleCreateConversation(user._id)}
    >
      <h4 className="text-white font-medium">
        {user.username}
      </h4>

      <p className="text-sm text-zinc-400">
        {user.email}
      </p>
    </div>
  ))
}

      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <p className="text-sm text-zinc-400">
            Your recent conversations
          </p>
        </div>
        {
    conversations.map((conversation) => {
      
      const otherParticipant =
       conversation.participants.find(
        (participant) => 
          participant._id !== user._id
        );
      return(
          <div
  key={conversation._id}
  onClick={() => setSelectedConversation(conversation)}
  className={`p-3 rounded-xl mb-3 cursor-pointer transition-all
  ${
    selectedConversation?._id === conversation._id
      ? "bg-blue-600"
      : "bg-zinc-900 hover:bg-zinc-800"
  }`}
>
  <div className="flex items-center gap-3">

    {/* Avatar */}
    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center font-bold">
      {otherParticipant?.username?.charAt(0).toUpperCase()}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">

      <h4 className="font-medium truncate">
        {otherParticipant?.username}
      </h4>

      <p className="text-sm text-zinc-300 truncate">
        {conversation.lastMessage?.text ||
          "No messages yet"}
      </p>

    </div>

  </div>
</div>
      )
    })
  }

      </div>

    </div>
  );
};

export default Sidebar;