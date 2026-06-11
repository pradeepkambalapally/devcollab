import { useState, useEffect } from "react";
import api from "../api/api"
import {useAuth} from "../context/AuthContext.jsx"
const Sidebar = () => {
  const [conversations, setConversations] = useState([]);
  const {user} = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  //fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
    try{
      
      const token = localStorage.getItem("token");
      const response = await api.get("/conversations",{
        headers : {
          Authorization : `Bearer ${token}`
        }

        
      })
      setConversations(response.data);
    
    }catch(error){
      console.log(error.message);
      
    }
    }
    fetchConversations();
  }, [])

  //fetch search results

  useEffect(() => {
    const fetchSearchResult = async() => {
      try{
        const token = localStorage.getItem("token");
        const response = await api.get(`/users/search?q=${searchTerm}`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
          

        })
        setSearchResults(response.data);
      }catch(error){
        console.log(error.message);
      }
      
    }
    if (searchTerm.trim()) {
    fetchSearchResult();
  } else {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchResults([]);
  }
  }, [searchTerm])

  // create Conversation

 
    const createConversation = async(receiverId) => {
      try{
        const token = localStorage.getItem("token");
        const response = await api.post("/conversations",{
          receiverId
        },{
          headers : {
            Authorization : `Bearer ${token}`,
          },
        })
        console.log(response.data);
        alert("Conversation Created");
      }catch(error){
        console.log(error.message);
      }
    } 
   
   
  return (
    <div className="w-1/4 border-r border-zinc-800 p-4">
      
      <h2 className="text-xl font-bold text-white mb-4">
        DevCollab
      </h2>

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
      onClick={() => createConversation(user._id)}
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
          <div key={conversation._id} className="p-3 rounded-lg bg-zinc-800 mb-2 cursor-pointer">
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