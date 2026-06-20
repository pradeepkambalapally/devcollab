
import { useAuth } from "../../context/AuthContext";
import { useOnlineUsers } from "../../hooks/useOnlineUsers";
import ProfileHeader from "./EmptyProfile";
import ProfileDetails from "./ProfileDetails";
import EmptyProfile  from "./EmptyProfile";
const RightPanel = ({selectedConversation}) => {
  const {user} = useAuth();
  const {onlineUsers} = useOnlineUsers();
  const otherParticipant =
  selectedConversation?.participants?.find(
    participant => participant._id !== user._id
  );

  const isOnline = onlineUsers.includes(otherParticipant?._id);
if (!selectedConversation) {
    return <EmptyProfile />;
  }

    return (
        <div className="w-80 border-l border-zinc-800 p-6">

            <h2 className="text-xl font-bold mb-6">
                Profile
            </h2>

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