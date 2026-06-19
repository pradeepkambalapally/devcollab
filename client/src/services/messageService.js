import api from "../api/api";

export const getMessages = async (
  conversationId
) => {
  const token = localStorage.getItem("token");
  const response = await api.get(
    `/messages/${conversationId}`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
  );

  return response.data;
};

export const sendMessage = async (
  conversationId,
  text,
  attachment = null,
) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    "/messages/send",
    {
      conversationId,
      text,
      attachment,
    },{
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
  );

  return response.data;
};