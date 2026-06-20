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
}) => {
  return (
    <div className="border-t border-zinc-800 pt-4">

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative w-fit">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-48 max-h-48 rounded-xl border border-zinc-700 object-cover shadow-lg"
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

      <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl p-2">

        <input
          type="text"
          value={newMessage}
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
            if (e.key === "Enter") {
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
          className="px-3 py-2 rounded-xl hover:bg-zinc-800 transition"
        >
          📎
        </button>

        <button
          onClick={() =>
            handleSendMessage(otherParticipant?._id)
          }
          disabled={!newMessage.trim() && !selectedImage}
          className={`px-4 py-2 rounded-xl transition ${
            !newMessage.trim() && !selectedImage
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default MessageInput;