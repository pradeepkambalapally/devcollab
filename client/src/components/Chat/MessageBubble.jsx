const MessageBubble = ({
  message,
  isMine,
  setPreviewImage,
}) => {
  return (
    <div
      className={`flex mb-4 ${
        isMine ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] rounded-2xl shadow-lg ${
          isMine
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-zinc-800 text-white rounded-bl-md"
        } ${
          message.attachment?.url ? "p-2" : "px-4 py-3"
        } transition-all duration-200`}
      >
        {message.attachment?.url && (
          <img
            src={message.attachment.url}
            alt={message.attachment.fileName}
            onClick={() =>
              setPreviewImage(message.attachment.url)
            }
            className="w-full max-w-xs sm:max-w-sm rounded-xl object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-200"
          />
        )}

        {message.text && (
          <p
            className={`break-words whitespace-pre-wrap leading-relaxed ${
              message.attachment?.url ? "mt-3" : ""
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex justify-end items-center gap-2 mt-2">
          <span className="text-[11px] text-zinc-300">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>

          {isMine && (
            <span
              className={`text-xs ${
                message.seen
                  ? "text-sky-300"
                  : "text-zinc-300"
              }`}
            >
              {message.seen ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;