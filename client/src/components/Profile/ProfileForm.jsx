const ProfileForm = ({
  username,
  email,
  bio,
  setBio,
  skills,
  setSkills,
  github,
  setGithub,
}) => {
  return (
    <div className="space-y-6">

      {/* Username */}
      <div>
        <label className="block mb-2 text-sm font-medium text-zinc-300">
          Username
        </label>

        <input
          type="text"
          value={username}
          readOnly
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-400 cursor-not-allowed"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-medium text-zinc-300">
          Email
        </label>

        <input
          type="email"
          value={email}
          readOnly
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-400 cursor-not-allowed"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block mb-2 text-sm font-medium text-zinc-300">
          Bio
        </label>

        <textarea
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell everyone a little about yourself..."
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none resize-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block mb-2 text-sm font-medium text-zinc-300">
          Skills
        </label>

        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, Node.js, Express, MongoDB..."
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Separate skills using commas.
        </p>
      </div>

      {/* GitHub */}
      <div>
        <label className="block mb-2 text-sm font-medium text-zinc-300">
          GitHub Profile
        </label>

        <input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/username"
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Share your GitHub profile so others can view your work.
        </p>
      </div>

    </div>
  );
};

export default ProfileForm;