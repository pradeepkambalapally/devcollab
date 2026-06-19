
import api from "../api/api";


export const markMessageAsSeen = async (conversationId) => {
    const token = localStorage.getItem("token");

    const response = await api.patch(`/messages/${conversationId}/seen`,{},{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    return response.data;
}

