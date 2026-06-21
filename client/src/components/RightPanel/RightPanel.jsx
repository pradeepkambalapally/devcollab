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
      className={`h-full flex flex-col bg-zinc-950 ${
        mobile
          ? "p-6"
          : "w-80 border-l border-zinc-800"
      }`}
    >
      {/* Desktop Header */}
      {!mobile && (
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold">
            Profile
          </h2>
        </div>
      )}

      {/* Scrollable Content */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto ${
          mobile ? "" : "p-6"
        }`}
      >
        <ProfileHeader
          otherParticipant={otherParticipant}
          isOnline={isOnline}
        />

        <ProfileDetails
          otherParticipant={otherParticipant}
        />
      </div>
    </div>
  );
};

export default RightPanel;