import ConversationCard from "./ConversationCard";

const ConversationList = ({
  conversations,
  user,
  onlineUsers,
  selectedConversation,
  setSelectedConversation,
}) => {
  return (
    <div className="mt-6">

      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">
          Messages
        </h2>

        <p className="text-sm text-zinc-400">
          Your recent conversations
        </p>
      </div>

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
  );
};

export default ConversationList;