const ConversationCard = ({
  conversation,
  user,
  onlineUsers,
  selectedConversation,
  setSelectedConversation,
}) => {
  const otherParticipant = conversation.participants.find(
    (participant) => participant._id !== user._id
  );

  const isOnline = onlineUsers.includes(otherParticipant._id);

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`p-3 rounded-xl mb-3 cursor-pointer transition-all ${
        selectedConversation?._id === conversation._id
          ? "bg-blue-600"
          : "bg-zinc-900 hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-center gap-4 p-4 rounded-2xl">

        {/* Avatar */}
        <div className="relative">
          {
          otherParticipant.avatar ? (
          <img
          src={otherParticipant.avatar}
          alt={otherParticipant.username}
          className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
          {otherParticipant.username.charAt(0).toUpperCase()}
        </div>
      )}

          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
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
  );
};

export default ConversationCard;