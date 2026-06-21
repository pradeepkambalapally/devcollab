import { FiArrowLeft } from "react-icons/fi";

const ChatHeader = ({
  otherParticipant,
  setSelectedConversation,
  onlineUsers,
  onProfileClick,
}) => {
  const isOnline = onlineUsers.includes(otherParticipant._id);

  const handleProfileClick = () => {
    // Open profile only on mobile/tablet
    if (window.innerWidth < 1280) {
      onProfileClick();
    }
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-800 bg-zinc-950">

      <div className="flex items-center gap-3 flex-1 min-w-0">

        {/* Mobile Back Button */}
        <button
          onClick={() => setSelectedConversation(null)}
          className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition"
        >
          <FiArrowLeft size={20} />
        </button>

        {/* Clickable Profile */}
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-3 flex-1 min-w-0 text-left hover:opacity-80 transition"
        >
          {/* Avatar */}
          {otherParticipant?.avatar ? (
            <img
              src={otherParticipant.avatar}
              alt={otherParticipant.username}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-zinc-700"
            />
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-700 flex items-center justify-center font-semibold text-lg">
              {otherParticipant?.username
                ?.charAt(0)
                .toUpperCase()}
            </div>
          )}

          {/* User Info */}
          <div className="min-w-0">
            <h2 className="font-semibold text-lg truncate">
              {otherParticipant?.username}
            </h2>

            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline
                    ? "bg-green-500"
                    : "bg-zinc-500"
                }`}
              />

              <p
                className={`text-sm ${
                  isOnline
                    ? "text-green-400"
                    : "text-zinc-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </button>

      </div>

    </div>
  );
};

export default ChatHeader;