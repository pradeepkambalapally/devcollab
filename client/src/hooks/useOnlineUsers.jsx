import { useState, useEffect } from "react";
import {socket}  from "../socket";


export const useOnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        })

        return () => {
            socket.off("onlineUsers");
        }
    },[])

    return {onlineUsers};
}