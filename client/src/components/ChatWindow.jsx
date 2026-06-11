import { useState, useEffect } from "react";
import api from "../api/api";

const ChatWindow = ({selectedConversation }) => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try{
        const token = localStorage.getItem("token");
        const response = await api.get(`/messages/${selectedConversation._id}`,{
          headers : {
            Authorization : `Bearer ${token}`,
          }
        })
        setMessages(response.data);
      }catch(error){
        console.error(error.message);
      }
    }
    if (selectedConversation) {
       fetchMessages();
    }
  }, [selectedConversation])

 const sendMessages = async () => {
  if (!newMessage.trim()) return;
  try {

    const token = localStorage.getItem("token");

    const response = await api.post(
      "/messages/send",
      {
        conversationId: selectedConversation._id,
        text: newMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    setMessages([...messages, response.data]);
    setNewMessage("");

  } catch (error) {
    console.error(error.message);
  }
};
  return (
  <div className="flex-1 p-4 text-white">

    {!selectedConversation ? (
      <h2>Select a Conversation</h2>
    ) : (
      <>
        <h2 className="text-xl font-bold mb-4">
          Messages
        </h2>

        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-zinc-800 p-3 rounded-lg mb-2"
          >
            {message.text}
          </div>
        ))}
        <div className="flex mt-4 gap-2">

  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 p-3 rounded-lg bg-zinc-800 text-white"
  />

  <button
    onClick={sendMessages}
    className="px-4 py-2 bg-blue-600 rounded-lg"
  >
    Send
  </button>

</div>
      </>
    )}
    

  </div>
);
};

export default ChatWindow;