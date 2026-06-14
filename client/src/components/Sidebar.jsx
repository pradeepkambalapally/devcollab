
import {useAuth} from "../context/AuthContext.jsx"
import { Link } from "react-router-dom";
import { useConversations } from "../hooks/useConversations.jsx";

const Sidebar = ({setSelectedConversation, refreshSidebar}) => {
const {user} = useAuth();
 const {conversations, searchTerm, setSearchTerm, searchResults, handleCreateConversation} = useConversations(refreshSidebar);
   
  return (
    <div className="w-1/4 border-r border-zinc-800 p-4">
      <h2 className="text-xl font-bold text-white mb-4">
        DevCollab
      </h2>
      <Link to="/profile" className="block mb-4 p-2 rounded bg-zinc-800 text-center">
      Edit Profile
      </Link>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-3 rounded-lg bg-zinc-800 text-white"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
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
        <h3 className="text-zinc-400 text-sm mb-3">
          Conversations
        </h3>
        {
    conversations.map((conversation) => {
      
      const otherParticipant =
       conversation.participants.find(
        (participant) => 
          participant._id !== user._id
        );
      return(
          <div key={conversation._id} 
            onClick={() => {
              console.log("Clicked:", conversation);
              setSelectedConversation(conversation)
            }}
            className="p-3 rounded-lg bg-zinc-800 mb-2 cursor-pointer">
              <h4 className="text-white font-medium"> {otherParticipant?.username}</h4>

                 <p className="text-sm text-zinc-400">{conversation.lastMessage?.text || "No messages yet"}</p>
          </div>
      )
    })
  }

      </div>

    </div>
  );
};

export default Sidebar;