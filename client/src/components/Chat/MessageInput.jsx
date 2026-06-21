import { FiPaperclip, FiSend } from "react-icons/fi";

const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  otherParticipant,
  socket,
  user,
  isTypingRef,
  typingTimeOutRef,
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview,
  fileInputRef,
  sending
}) => {
  return (
    <div className="border-t border-zinc-800 p-3 md:p-4">

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative w-fit">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 sm:w-40 md:w-48 rounded-xl border border-zinc-700 object-cover shadow-lg"
          />

          <button
            onClick={() => {
              if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
              }

              setSelectedImage(null);
              setImagePreview("");

              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full w-7 h-7 flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 md:gap-3 bg-zinc-900 rounded-2xl p-2">

        <input
          type="text"
          value={newMessage}
          disabled={sending}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none px-3 py-2 text-white"
          onChange={(e) => {

            setNewMessage(e.target.value);

            if (!isTypingRef.current) {

              socket.emit("typing", {
                receiverId: otherParticipant?._id,
                senderName: user.username,
              });

              isTypingRef.current = true;
            }

            clearTimeout(typingTimeOutRef.current);

            typingTimeOutRef.current = setTimeout(() => {

              socket.emit("stopTyping", {
                receiverId: otherParticipant?._id,
              });

              isTypingRef.current = false;

            }, 1000);

          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !sending) {
              handleSendMessage(otherParticipant?._id);
            }
          }}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {

            const file = e.target.files[0];

            if (!file) return;

            if (imagePreview) {
              URL.revokeObjectURL(imagePreview);
            }

            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));

            e.target.value = "";

          }}
        />

        <button
        onClick={() => fileInputRef.current?.click()}
        disabled={sending}
        className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPaperclip size={20} />
        </button>


        <button
        onClick={() => handleSendMessage(otherParticipant?._id)}
        disabled={sending || (!newMessage.trim() && !selectedImage)}
        className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all duration-200 ${
          sending || (!newMessage.trim() && !selectedImage)
          ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-500 rounded-xl px-4 md:px-5 py-2"
          }`}
          >
            <FiSend size={18} />
             <span className="hidden md:inline">
              {sending ? "Sending..." : "Send"}
              </span>
            </button>
      </div>

    </div>
  );
};

export default MessageInput;