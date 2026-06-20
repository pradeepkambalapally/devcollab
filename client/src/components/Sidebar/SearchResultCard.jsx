const SearchResultCard = ({ user, handleCreateConversation }) => {
  return (
    <div
      className="p-3 mt-2 rounded-lg bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition"
      onClick={() => handleCreateConversation(user._id)}
    >
      <h4 className="text-white font-medium">
        {user.username}
      </h4>

      <p className="text-sm text-zinc-400">
        {user.email}
      </p>
    </div>
  );
};

export default SearchResultCard;