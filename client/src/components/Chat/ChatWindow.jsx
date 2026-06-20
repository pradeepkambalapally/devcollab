import { useEffect, useRef, useState} from "react";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../socket";
import { useMessages } from "../../hooks/useMessages";
import MessageList from "./MessageList";
import ImageModal from "./ImageModal";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import WelcomeScreen from "./WelcomeScreen";
import TypingIndicator from "./TypingIndicator";


const ChatWindow = ({selectedConversation, setRefreshSidebar }) => {


  const {messages, newMessage, setNewMessage, handleSendMessage, 
    isTyping, typingUser, selectedImage, setSelectedImage, fileInputRef, imagePreview, setImagePreview} = useMessages(selectedConversation, setRefreshSidebar);
  const [previewImage, setPreviewImage] = useState(null);
  
  const messagesEndRef = useRef(null);
  const typingTimeOutRef = useRef(null);
  const isTypingRef = useRef(false);
  const {user} = useAuth();
  

  const otherParticipant = selectedConversation?.participants?.find((participant) => participant._id !== user._id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior : "smooth"
    })
  },[messages]);

  
  useEffect(() => {
  if (user?._id) {
    socket.emit("join", user._id);
  }
}, [user]);






  return (
  <div className="flex-1 flex flex-col p-4 text-white">

    {!selectedConversation ? (
      <WelcomeScreen />
    ) : (

      <>
        {/* Header */}
        <ChatHeader
    otherParticipant={otherParticipant}
/>

        {/* Messages */}
       <MessageList
    messages={messages}
    user={user}
    messagesEndRef={messagesEndRef}
    setPreviewImage={setPreviewImage}
/>

      {
        isTyping && (
        <TypingIndicator
        typingUser={typingUser}
        />
        )
      }


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
/>

      </>

    )}

    <ImageModal
  previewImage={previewImage}
  setPreviewImage={setPreviewImage}
/>

  </div>
);
};

export default ChatWindow;