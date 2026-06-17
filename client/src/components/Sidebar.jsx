
import {useAuth} from "../context/AuthContext.jsx"
import { Link } from "react-router-dom";
import { useConversations } from "../hooks/useConversations.jsx";
import {useOnlineUsers} from "../hooks/useOnlineUsers.jsx";

const Sidebar = ({setSelectedConversation, refreshSidebar, selectedConversation}) => {
const {user} = useAuth();
 const {conversations, searchTerm, setSearchTerm, searchResults, handleCreateConversation} = useConversations(refreshSidebar);

 const {onlineUsers} = useOnlineUsers();
   
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

        const isOnline = onlineUsers.includes(otherParticipant._id);
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
  <div
  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800 cursor-pointer"
>
  {/* Avatar */}
  <div className="relative">

    <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-bold">
      {otherParticipant?.username?.charAt(0).toUpperCase()}
    </div>

    {isOnline && (
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
    )}

  </div>

  {/* User Info */}
  <div className="flex-1 min-w-0">

    <div className="flex items-center gap-2">
      <h4 className="font-semibold truncate">
        {otherParticipant?.username}
      </h4>

      <span
        className={`text-xs ${
          isOnline
            ? "text-green-400"
            : "text-zinc-500"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>

    <p className="text-sm text-zinc-400 truncate mt-1">
      {conversation.lastMessage?.text || "No messages yet"}
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