const MessageBubble = ({ message, isMine, setPreviewImage }) => {
  return (
    <div
      className={`flex mb-3 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md rounded-2xl shadow-md ${
          isMine ? "bg-blue-600" : "bg-zinc-800"
        } ${
          message.attachment?.url ? "p-1.5" : "px-4 py-3"
        }`}
      >
        {message.attachment?.url && (
          <img
            src={message.attachment.url}
            alt={message.attachment.fileName}
            onClick={() => setPreviewImage(message.attachment.url)}
            className="max-w-[280px] max-h-[320px] rounded-xl object-cover cursor-pointer hover:opacity-90 transition"
          />
        )}

        {message.text && (
          <p className={message.attachment?.url ? "mt-2" : ""}>
            {message.text}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 mt-2">
          <span className="text-xs text-zinc-300">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>

          {isMine && message.seen && (
            <span className="text-xs text-blue-300">
              Seen
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;