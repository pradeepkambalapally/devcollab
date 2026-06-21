import api from "../api/api"
import toast from "react-hot-toast";

export const uploadImage = async (image) => {
  try {

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("image", image);

    const response = await api.post(
      "/images/upload",
      formData,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Image upload failed."
    );

    throw error; // Re-throw so the calling component still knows it failed
  }
};