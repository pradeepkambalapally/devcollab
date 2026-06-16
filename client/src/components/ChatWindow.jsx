import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { socket } from "../socket";
import { useMessages } from "../hooks/useMessages";

const ChatWindow = ({selectedConversation, setRefreshSidebar }) => {

  const {messages, newMessage, setNewMessage, handleSendMessage} = useMessages(selectedConversation, setRefreshSidebar);
  
  const messagesEndRef = useRef(null);
  const {user} = useAuth();

  const otherParticipant = selectedConversation?.participants?.find((participant) => participant._id !== user._id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior : "smooth"
    })
  },[messages]);

  
  useEffect(() => {
  socket.on("connect", () => {
    console.log(
      "Connected:",
      socket.id
    );
  });

  

  return () => {
    socket.off("connect");
  };
}, []);



useEffect(() => {
  if (user?._id) {
    socket.emit("join", user._id);
  }
}, [user]);


  return (
  <div className="flex-1 flex flex-col p-4 text-white">

    {!selectedConversation ? (

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">

          <div className="text-6xl mb-4">
            💬
          </div>

          <h2 className="text-3xl font-bold mb-3">
            Welcome to DevCollab
          </h2>

          <p className="text-zinc-400">
            Search for developers and start collaborating.
          </p>

        </div>
      </div>

    ) : (

      <>
        {/* Header */}
        <div className="border-b border-zinc-800 pb-4 mb-4">
          <h2 className="text-xl font-bold">
            {otherParticipant?.username}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => {

            const isMine =
              message.sender._id === user._id;

            return (
              <div
                key={message._id}
                className={`flex mb-3 ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow-md ${
                  isMine ? "bg-blue-600" : "bg-zinc-800"
                  }`}
                  >
                  <p>{message.text}</p>

                  <p className="text-xs text-zinc-300 mt-1 text-right">
                    {new Date(
                      message.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
       <div className="border-t border-zinc-800 pt-4">
  <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl p-2">

    <input
      type="text"
      value={newMessage}
      onChange={(e) =>
        setNewMessage(e.target.value)
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSendMessage();
        }
      }}
      placeholder="Type a message..."
      className="flex-1 bg-transparent outline-none px-3 py-2 text-white"
    />

    <button
      onClick={handleSendMessage}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
    >
      Send
    </button>

  </div>
</div>
      </>

    )}

  </div>
);
};

export default ChatWindow;