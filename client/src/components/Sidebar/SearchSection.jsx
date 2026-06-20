import SearchResultCard from "./SearchResultCard";

const SearchSection = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  handleCreateConversation,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchResults.length > 0 && (
        <div className="mt-2 space-y-2">
          {searchResults.map((user) => (
            <SearchResultCard
              key={user._id}
              user={user}
              handleCreateConversation={handleCreateConversation}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchSection;