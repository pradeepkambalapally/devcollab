const ChatHeader = ({ otherParticipant }) => {
  return (
    <div className="border-b border-zinc-800 pb-4 mb-4">
      <h2 className="text-xl font-bold">
        {otherParticipant?.username}
      </h2>
    </div>
  );
};

export default ChatHeader;