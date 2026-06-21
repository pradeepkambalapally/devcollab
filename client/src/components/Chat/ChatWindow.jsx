import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../socket";
import { useMessages } from "../../hooks/useMessages";
import MessageList from "./MessageList";
import ImageModal from "./ImageModal";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import WelcomeScreen from "./WelcomeScreen";
import TypingIndicator from "./TypingIndicator";
import { useOnlineUsers } from "../../hooks/useOnlineUsers";
import RightPanel from "../RightPanel/RightPanel";

const ChatWindow = ({
  selectedConversation,
  setSelectedConversation,
  setRefreshSidebar,
}) => {
  const {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    isTyping,
    typingUser,
    selectedImage,
    setSelectedImage,
    fileInputRef,
    imagePreview,
    setImagePreview,
    sending,
  } = useMessages(selectedConversation, setRefreshSidebar);

  const [previewImage, setPreviewImage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

 
  const typingTimeOutRef = useRef(null);
  const isTypingRef = useRef(false);
  const {onlineUsers} = useOnlineUsers();

  const { user } = useAuth();

  const otherParticipant = selectedConversation?.participants?.find(
    (participant) => participant._id !== user._id
  );

const messageContainerRef = useRef(null);

useEffect(() => {
  const container = messageContainerRef.current;

  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }
}, [messages]);

  return (
    
    <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden bg-zinc-950">
      

      {!selectedConversation ? (
        <WelcomeScreen />
      ) : (
        <>
          <ChatHeader
            otherParticipant={otherParticipant}
            setSelectedConversation={setSelectedConversation}
            onlineUsers={onlineUsers}
            onProfileClick={() => setShowProfile(true)}
          />

          <MessageList
            messages={messages}
            user={user}
            messageContainerRef={messageContainerRef}
            setPreviewImage={setPreviewImage}
          />

          {isTyping && (
            <TypingIndicator typingUser={typingUser} />
          )}

          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            otherParticipant={otherParticipant}
            socket={socket}
            user={user}
            isTypingRef={isTypingRef}
            typingTimeOutRef={typingTimeOutRef}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            fileInputRef={fileInputRef}
            sending={sending}
          />
          <ImageModal
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          />
        </>
      )}

      

      {/* Mobile Profile Drawer */}
{/* Mobile Profile Screen */}
{showProfile && (
  <div className="fixed inset-0 z-50 bg-zinc-950 xl:hidden">

    {/* Header */}
    <div className="flex items-center gap-4 p-4 border-b border-zinc-800">

      <button
        onClick={() => setShowProfile(false)}
        className="text-2xl hover:text-blue-400 transition"
      >
        ←
      </button>

      <h2 className="text-lg font-semibold">
        Profile
      </h2>

    </div>

    {/* Content */}
    <div className="h-[calc(100vh-73px)] overflow-y-auto">
      <RightPanel
        selectedConversation={selectedConversation}
        mobile={true}
      />
    </div>

  </div>
)}
    </div>
  );
};

export default ChatWindow;