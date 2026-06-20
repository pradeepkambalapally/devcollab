import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/userService";
import toast from "react-hot-toast";

export const useProfile = () => {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getProfile();
        const data = response.user;
        setBio(data.bio || "");
        setSkills(
          data.skills?.join(", ") || ""
        );
        setGithub(data.github || "");
        setAvatar(data.avatar || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
      } catch (error) {
        console.log(error.message);
      }finally{
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
   setLoading(true);
   try{
     await updateProfile({
      bio,
      skills: skills
        .split(",")
        .map(skill => skill.trim()).filter(Boolean),
      github,
      avatar,
    });
    return true
   }catch(error){
    toast.error("Couldn't load profile");
    throw error;
   }finally{
    setLoading(false);
   }
  };

  return {
    bio,
    setBio,
    skills,
    setSkills,
    github,
    setGithub,
    avatar,
    setAvatar,
    saveProfile,
    loading,
    email,
    username
  };
};