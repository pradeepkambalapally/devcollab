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
    <div className="space-y-5">

      {/* Username */}
      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Username
        </label>

        <input
          type="text"
          value={username}
          readOnly
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 cursor-not-allowed"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Email
        </label>

        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 cursor-not-allowed"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Bio
        </label>

        <textarea
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Skills
        </label>

        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, Node.js, MongoDB"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
        />
      </div>

      {/* GitHub */}
      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          GitHub
        </label>

        <input
          type="text"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/username"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
        />
      </div>

    </div>
  );
};

export default ProfileForm;