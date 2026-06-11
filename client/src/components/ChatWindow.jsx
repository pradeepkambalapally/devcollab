const ChatWindow = () => {
  return (
    <div className="flex-1 flex flex-col">
      
      <div className="border-b border-zinc-800 p-4">
        Select a conversation
      </div>

      <div className="flex-1 p-4">
        Messages will appear here
      </div>

      <div className="border-t border-zinc-800 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded bg-zinc-900 outline-none"
        />
      </div>

    </div>
  );
};

export default ChatWindow;