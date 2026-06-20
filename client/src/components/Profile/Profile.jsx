
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile.jsx";
import AvatarSection from "./AvatarSection.jsx";
import ProfileForm from "./ProfileForm.jsx";
import toast from "react-hot-toast";

const Profile = () => {
    const {bio, skills, github, avatar,setBio, setSkills, setGithub, setAvatar,saveProfile,email, username, loading} = useProfile();
    const navigate = useNavigate();
    const handleSave = async() =>{
        const success = await saveProfile();
        if(success){
            toast.success("Profile updated successfully!");
            navigate("/");
        }else{
          toast.error("Failed to update profile.");
        }
    }

return (
  <div className="min-h-screen bg-zinc-950 p-8 text-white">

    <div className="max-w-2xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-zinc-400 hover:text-white"
      >
        ← Back
      </button>

      <div className="bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Edit Profile
        </h1>

        <AvatarSection
          avatar={avatar}
          setAvatar={setAvatar}
          username={username}
        />

        <ProfileForm
          username={username}
          email={email}
          bio={bio}
          setBio={setBio}
          skills={skills}
          setSkills={setSkills}
          github={github}
          setGithub={setGithub}
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>

  </div>
);
}

export default Profile;