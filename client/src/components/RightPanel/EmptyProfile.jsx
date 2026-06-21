const EmptyProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">

      <div className="w-28 h-28 rounded-full bg-zinc-800 flex items-center justify-center text-5xl">
        👤
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No Conversation Selected
      </h2>

      <p className="mt-3 text-zinc-400 max-w-xs">
        Select a conversation to view the developer's profile,
        skills, bio and GitHub information.
      </p>

    </div>
  );
};

export default EmptyProfile;