import { useEffect, useState } from "react";
import api from "../api/api.jsx"

const Profile = () => {
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState("");
    const [github, setGithub] = useState("");
    const [avatar, setAvatar] = useState("");

     const handleSave = async() =>{
            try{
                const token = localStorage.getItem("token");
                await api.put("/users/profile", {
                    bio,
                    skills : skills.split(",").map(skill => skill.trim()),
                    github,
                    avatar
                },{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                alert("Profile Updated");
            }catch(error){
                console.log(error.message);
            }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const token = localStorage.getItem("token");
                const response = await api.get("/users/profie", {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                setBio(response.data.bio || "");
                setSkills(response.data.skills?.join(", ") || "");
                setGithub(response.data.github || "");
                setAvatar(response.data.avatar || "");
            }catch(error){
                console.log(error.message);
            }
        }
        fetchProfile();
    }, [])
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