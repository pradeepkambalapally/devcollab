import ConversationCard from "./ConversationCard";

const ConversationList = ({
  conversations,
  user,
  onlineUsers,
  selectedConversation,
  setSelectedConversation,
}) => {
  return (
    <div className="mt-6 flex-1 overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Messages
          </h2>

          <p className="text-sm text-zinc-400">
            Stay connected with developers
          </p>
        </div>
{/* 
        <div className="px-3 py-1 rounded-full bg-blue-600 text-sm font-medium">
          {conversations.length}
        </div> */}
      </div>

      {/* Empty State */}
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">💬</div>

          <h3 className="text-lg font-semibold text-white">
            No Conversations
          </h3>

          <p className="text-sm text-zinc-400 mt-2 max-w-xs">
            Search for a developer and start your first conversation.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <ConversationCard
              key={conversation._id}
              conversation={conversation}
              user={user}
              onlineUsers={onlineUsers}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ConversationList;