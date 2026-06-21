const SearchResultCard = ({
  user,
  handleCreateConversation,
}) => {
  return (
    <div
      onClick={() => handleCreateConversation(user._id)}
      className="flex items-center gap-4 p-4 mt-3 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer hover:bg-zinc-800 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
    >
      {/* Avatar */}
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover border border-zinc-700"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>
      )}

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate">
          {user.username}
        </h4>

        <p className="text-sm text-zinc-400 truncate">
          {user.email}
        </p>
      </div>

      {/* Action */}
      <div className="text-blue-400 font-medium text-sm">
        Chat
      </div>
    </div>
  );
};

export default SearchResultCard;