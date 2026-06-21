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

  const unread =
    conversation.lastMessage &&
    !conversation.lastMessage.seen &&
    conversation.lastMessage.sender?._id !== user._id;

  const isOnline = onlineUsers.includes(otherParticipant._id);

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`group mb-2 cursor-pointer rounded-2xl transition-all duration-200 ${
        selectedConversation?._id === conversation._id
          ? "bg-blue-600 shadow-lg"
          : "bg-zinc-900 hover:bg-zinc-800 hover:scale-[1.01]"
      }`}
    >
      <div className="flex items-center gap-4 p-4">

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {otherParticipant.avatar ? (
            <img
              src={otherParticipant.avatar}
              alt={otherParticipant.username}
              className="w-14 h-14 rounded-full object-cover border border-zinc-700"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-semibold">
              {otherParticipant.username.charAt(0).toUpperCase()}
            </div>
          )}

          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-900" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Top Row */}
          <div className="flex justify-between items-center">

            <h4
              className={`truncate ${
                unread
                  ? "font-bold text-white"
                  : "font-semibold text-white"
              }`}
            >
              {otherParticipant.username}
            </h4>

            {conversation.lastMessage && (
              <span className="text-[11px] text-zinc-400 flex-shrink-0 ml-2">
                {new Date(
                  conversation.lastMessage.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}

          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-1 gap-3">

            <p
              className={`truncate text-sm ${
                unread
                  ? "text-white font-medium"
                  : "text-zinc-400"
              }`}
            >
              {conversation.lastMessage
                ? conversation.lastMessage.text ||
                  (conversation.lastMessage.attachment?.url
                    ? "📷 Photo"
                    : "")
                : "No messages yet"}
            </p>

            {unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0" />
            )}

          </div>

          {/* Status */}
          <p
            className={`mt-1 text-xs ${
              isOnline
                ? "text-green-400"
                : "text-zinc-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>

        </div>

      </div>
    </div>
  );
};

export default ConversationCard;