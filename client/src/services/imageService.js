import api from "../api/api"
import toast from "react-hot-toast";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();

    formData.append("image", image);

    const response = await api.post(
      "/images/upload",
      formData
    );

    return response.data;

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Image upload failed."
    );

    throw error; // Re-throw so the calling component still knows it failed
  }
};