import { FiSearch } from "react-icons/fi";
import SearchResultCard from "./SearchResultCard";

const SearchSection = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  handleCreateConversation,
}) => {
  return (
    <div className="mb-6">

      {/* Search Bar */}
      <div className="relative">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search developers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="mt-4 max-h-80 overflow-y-auto space-y-3">

          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <SearchResultCard
                key={user._id}
                user={user}
                handleCreateConversation={handleCreateConversation}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">

              <div className="text-4xl mb-3">🔍</div>

              <h3 className="font-semibold text-white">
                No Developers Found
              </h3>

              <p className="text-sm text-zinc-400 mt-1">
                Try searching with another username.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default SearchSection;