import api from "../api/api";

export const getConversations = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/conversations",{
    headers : {
        Authorization : `Bearer ${token}`
    }
  });
  return response.data;
};

export const createConversation = async (receiverId) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    "/conversations",
    { receiverId },{
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
  );

  return response.data;
};