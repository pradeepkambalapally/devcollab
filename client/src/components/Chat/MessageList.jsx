import MessageBubble from "./MessageBubble";

const MessageList = ({
  messages,
  user,
  messagesEndRef,
  setPreviewImage,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isMine={message.sender._id === user._id}
          setPreviewImage={setPreviewImage}
        />
      ))}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;