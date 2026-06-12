import { useAuth } from "../context/AuthContext";
const RightPanel = ({selectedConversation}) => {
  const {user} = useAuth();

  const otherParticipant =
  selectedConversation?.participants?.find(
    participant => participant._id !== user._id
  );
  if (!selectedConversation) {
  return (
    <div className="w-80 border-l border-zinc-800 p-6">
      <h2 className="text-xl font-bold">
        Profile
      </h2>

      <div className="mt-6 text-zinc-400">
        Select a conversation to view profile details.
      </div>
    </div>
  );
}
 return (
  <div className="w-80 border-l border-zinc-800 p-6">

    <h2 className="text-xl font-bold mb-6">
      Profile
    </h2>

    <div className="flex flex-col items-center">

      <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-2xl font-bold">
        {otherParticipant?.username?.charAt(0).toUpperCase()}
      </div>

      <h3 className="mt-4 text-lg font-semibold">
        {otherParticipant?.username}
      </h3>

      <p className="text-zinc-400 text-sm">
        {otherParticipant?.email}
      </p>

    </div>

    <div className="mt-8 space-y-4">

      <div>
        <p className="text-zinc-500 text-sm">
          Username
        </p>

        <p>
          {otherParticipant?.username}
        </p>
      </div>

      <div>
        <p className="text-zinc-500 text-sm">
          Email
        </p>

        <p>
          {otherParticipant?.email}
        </p>
      </div>

    </div>

  </div>
);
};

export default RightPanel;