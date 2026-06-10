
import {useState} from "react";
import api from "../api/api.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username : "",
        password : ""
    });

    const {login} = useAuth();

    const handleChange = (e) => {
        
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("/auth/login", formData);   
            login(response.data.user,response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
        }catch(error){
            console.error(error.response.data);
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit = {handleSubmit}>
                 <input
                   type="text"
                   name="username"
                   placeholder="Username"
                   value={formData.username}
                   onChange={handleChange}
                 />

                 <input
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={formData.password}
                   onChange={handleChange}
                 />

                 <button>Login</button>

            </form>
        </div>
        
    )
}

export default Login;