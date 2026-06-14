import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/userService";

export const useProfile = () => {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setBio(data.bio || "");
        setSkills(
          data.skills?.join(", ") || ""
        );
        setGithub(data.github || "");
        setAvatar(data.avatar || "");
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
   try{
     await updateProfile({
      bio,
      skills: skills
        .split(",")
        .map(skill => skill.trim()),
      github,
      avatar,
    });
    return true
   }catch(error){
    console.log(error.message);
    return false;
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
  };
};