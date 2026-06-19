import { useEffect } from "react"
import { socket } from "../socket"
import { useAuth } from "../context/AuthContext"


export const useMessageSeen = (selectedConversation, setMessages) => {
    const {user} = useAuth();
    useEffect(() => {
        socket.on("messageSeen", ({conversationId}) => {
           
            if(conversationId !== selectedConversation?._id) return;
           
            setMessages((prev) => 
                prev.map((message) => {
                    return message.sender._id === user._id ? { ...message, seen : true} : message
                }
                )
            )
        })

        return () => {
            socket.off("messageSeen");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedConversation, setMessages])
}