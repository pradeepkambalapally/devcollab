
import { useProfile } from "../hooks/useProfile.jsx";

const Profile = () => {
    const {bio, skills, github, avatar,setBio, setSkills, setGithub, setAvatar,saveProfile} = useProfile();

     const handleSave = async() =>{
        const success = saveProfile();
        if(success){
            alert("Profile Updated");
        }
    }

    return (
   <div className="min-h-screen bg-zinc-950 text-white p-8">

    <h1 className="text-3xl font-bold mb-8">
      Edit Profile
    </h1>

    <div className="max-w-xl space-y-4">

      <input
        type="text"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) =>
          setAvatar(e.target.value)
        }
        className="w-full p-3 rounded bg-zinc-800"
      />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) =>
          setBio(e.target.value)
        }
        className="w-full p-3 rounded bg-zinc-800"
      />

      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) =>
          setSkills(e.target.value)
        }
        className="w-full p-3 rounded bg-zinc-800"
      />

      <input
        type="text"
        placeholder="GitHub URL"
        value={github}
        onChange={(e) =>
          setGithub(e.target.value)
        }
        className="w-full p-3 rounded bg-zinc-800"
      />

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 rounded-lg"
      >
        Save Profile
      </button>

    </div>

  </div>
);
}

export default Profile;