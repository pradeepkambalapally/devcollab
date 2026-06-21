const ProfileDetails = ({ otherParticipant }) => {
  return (
    <div className="mt-8 space-y-5">

      {/* Username */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          Username
        </p>

        <p className="font-medium">
          {otherParticipant?.username}
        </p>
      </div>

      {/* Email */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          Email
        </p>

        <p className="break-all">
          {otherParticipant?.email}
        </p>
      </div>

      {/* Bio */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          Bio
        </p>

        <p className="text-zinc-300 leading-relaxed">
          {otherParticipant?.bio || "No bio added yet."}
        </p>
      </div>

      {/* Skills */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-3">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {otherParticipant?.skills?.length ? (
            otherParticipant.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-600/30 text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-zinc-400">
              No skills added.
            </p>
          )}

        </div>
      </div>

      {/* GitHub */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          GitHub
        </p>

        {otherParticipant?.github ? (
          <a
            href={otherParticipant.github}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline break-all transition"
          >
            {otherParticipant.github}
          </a>
        ) : (
          <p className="text-zinc-400">
            GitHub profile not added.
          </p>
        )}
      </div>

    </div>
  );
};

export default ProfileDetails;