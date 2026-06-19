import api from "../api/api";

export const uploadImage = async (imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);
    
    const token = localStorage.getItem("token");
    const response = await api.post('/images/upload',formData, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });

    return response.data;
}
