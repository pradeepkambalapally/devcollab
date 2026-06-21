import { useAuth } from "../../context/AuthContext";
import { useOnlineUsers } from "../../hooks/useOnlineUsers";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import EmptyProfile from "./EmptyProfile";

const RightPanel = ({
  selectedConversation,
  mobile = false,
}) => {
  const { user } = useAuth();
  const { onlineUsers } = useOnlineUsers();

  const otherParticipant =
    selectedConversation?.participants?.find(
      (participant) => participant._id !== user._id
    );

  const isOnline = onlineUsers.includes(
    otherParticipant?._id
  );

  if (!selectedConversation) {
    return <EmptyProfile />;
  }

  return (
    <div
      className={`h-full ${
        mobile
          ? "bg-zinc-950 p-6"
          : "w-80 border-l border-zinc-800 bg-zinc-950 p-6"
      }`}
    >
      {/* Hide title on mobile because ChatWindow already shows it */}
      {!mobile && (
        <h2 className="text-xl font-bold mb-6">
          Profile
        </h2>
      )}

      <ProfileHeader
        otherParticipant={otherParticipant}
        isOnline={isOnline}
      />

      <ProfileDetails
        otherParticipant={otherParticipant}
      />
    </div>
  );
};

export default RightPanel;