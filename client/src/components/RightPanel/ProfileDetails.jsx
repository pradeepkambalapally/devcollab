const ProfileDetails = ({ otherParticipant }) => {
  return (
    <div className="mt-8 space-y-4">

      <div>
        <p className="text-zinc-500 text-sm">
          Username
        </p>

        <p>{otherParticipant?.username}</p>
      </div>

      <div>
        <p className="text-zinc-500 text-sm">
          Email
        </p>

        <p>{otherParticipant?.email}</p>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl">
        <p className="text-zinc-500 text-sm mb-2">
          Bio
        </p>

        <p>{otherParticipant?.bio || "NA"}</p>
      </div>

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
  );
};

export default ProfileDetails;