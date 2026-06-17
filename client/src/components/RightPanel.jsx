
import { useAuth } from "../context/AuthContext";
import { useOnlineUsers } from "../hooks/useOnlineUsers";
const RightPanel = ({selectedConversation}) => {
  const {user} = useAuth();
  const {onlineUsers} = useOnlineUsers();
  const otherParticipant =
  selectedConversation?.participants?.find(
    participant => participant._id !== user._id
  );

  const isOnline = onlineUsers.includes(otherParticipant?._id);
 if (!selectedConversation) {
  return (
    <div className="w-80 border-l border-zinc-800 p-6">

      <h2 className="text-xl font-bold mb-6">
        Profile
      </h2>

      <div className="flex flex-col items-center justify-center h-full text-center">

        <div className="text-5xl mb-4">
          👤
        </div>

        <h3 className="text-lg font-semibold mb-2">
          No Profile Selected
        </h3>

        <p className="text-zinc-400">
          Select a conversation to view user details.
        </p>

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

      <div className="flex items-center gap-2 mt-2">

  <div
    className={`w-2 h-2 rounded-full ${
      isOnline
        ? "bg-green-500"
        : "bg-zinc-500"
    }`}
  ></div>

  <span
    className={`text-sm ${
      isOnline
        ? "text-green-400"
        : "text-zinc-500"
    }`}
  >
    {isOnline ? "Online" : "Offline"}
  </span>

</div>

<p className="text-zinc-400 text-sm mt-2">
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
       {/* Bio */}
  <div className="bg-zinc-900 p-4 rounded-xl">
    <p className="text-zinc-500 text-sm mb-2">
      Bio
    </p>

    <p>
      {otherParticipant?.bio || "NA"}
    </p>
  </div>

  {/* Skills */}
  <div className="bg-zinc-900 p-4 rounded-xl">
    <p className="text-zinc-500 text-sm mb-3">
      Skills
    </p>

    <div className="flex flex-wrap gap-2">
      {otherParticipant?.skills?.length ? (
        otherParticipant.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-zinc-800 rounded-full text-sm"
          >
            {skill}
          </span>
        ))
      ) : (
        <p>NA</p>
      )}
    </div>
  </div>

  {/* GitHub */}
  <div className="bg-zinc-900 p-4 rounded-xl">
    <p className="text-zinc-500 text-sm mb-2">
      GitHub
    </p>

    {otherParticipant?.github ? (
      <a
        href={otherParticipant.github}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 hover:underline break-all"
      >
        View Profile
      </a>
    ) : (
      <p>NA</p>
    )}
  </div>

    </div>

  </div>
);
};

export default RightPanel;