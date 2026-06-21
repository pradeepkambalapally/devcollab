import MessageBubble from "./MessageBubble";

const MessageList = ({
  messages,
  user,
  messageContainerRef,
  setPreviewImage,
}) => {
  return (
    <div 
     ref={messageContainerRef}
     className="flex-1 min-h-0 overflow-y-auto px-3 md:px-6 py-4 space-y-4">
      
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isMine={message.sender._id === user._id}
          setPreviewImage={setPreviewImage}
        />
      ))}
    </div>
  );
};

export default MessageList;