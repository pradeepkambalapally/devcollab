const ProfileHeader = ({ otherParticipant, isOnline }) => {
  if (!otherParticipant) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-28 h-28 rounded-full bg-zinc-800 flex items-center justify-center text-5xl">
          👤
        </div>

        <h3 className="mt-6 text-xl font-semibold text-white">
          No Conversation Selected
        </h3>

        <p className="mt-2 text-sm text-zinc-400 max-w-xs">
          Select a conversation to view the developer's profile, skills, bio and GitHub.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">

      {otherParticipant.avatar ? (
        <img
          src={otherParticipant.avatar}
          alt={otherParticipant.username}
          className="w-28 h-28 rounded-full object-cover border-4 border-zinc-700"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-zinc-700 flex items-center justify-center text-4xl font-bold">
          {otherParticipant.username.charAt(0).toUpperCase()}
        </div>
      )}

      <h3 className="mt-4 text-lg font-semibold">
        {otherParticipant.username}
      </h3>

      <div className="flex items-center gap-2 mt-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isOnline ? "bg-green-500" : "bg-zinc-500"
          }`}
        />

        <span
          className={`text-sm ${
            isOnline ? "text-green-400" : "text-zinc-500"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <p className="text-zinc-400 text-sm mt-2">
        {otherParticipant.email}
      </p>
    </div>
  );
};

export default ProfileHeader;