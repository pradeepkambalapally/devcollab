
import toast from "react-hot-toast";
import api from "../api/api";


export const markMessageAsSeen = async (conversationId) => {
    try{
        const token = localStorage.getItem("token");
        
        const response = await api.patch(`/messages/${conversationId}/seen`,{},{
            headers : {
                Authorization : `Bearer ${token}`
            }
    })

    return response.data;
    }catch(error){
        toast.error(error.response?.data?.message);
    }
}

