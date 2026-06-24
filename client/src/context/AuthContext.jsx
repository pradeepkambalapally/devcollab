import { useEffect } from "react";
import {createContext, useState, useContext} from "react";
import {socket} from "../socket"

    const AuthContext = createContext();

    export const AuthProvider = ({children}) => {

        const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
        );

        const [token, setToken] = useState(
        localStorage.getItem("token") || null
        );
        
        const login = (userData, token) => {
         setUser(userData);
         setToken(token);

         localStorage.setItem("user", JSON.stringify(userData));
         localStorage.setItem("token", token);
        };
        const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        };

        useEffect(() => {
  if (!user?._id) {
    if (socket.connected) {
      socket.disconnect();
    }
    return;
  }

  if (!socket.connected) {
    socket.connect();
  }

  socket.emit("join", user._id);

  return () => {
    socket.off("typing");
    socket.off("stopTyping");
    socket.off("newMessage");
    socket.off("messageSeen");
  };
}, [user]);

        return (
            <AuthContext.Provider 
            value = {{
                user,
                token,
                login,
                logout
            }}> {children} </AuthContext.Provider>
        )
    }

    // eslint-disable-next-line react-refresh/only-export-components
    export const useAuth = () => {
        return useContext(AuthContext);
    }