
import {useState} from "react";
import api from "../api/api.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
            toast.success("Welcome back!");
            navigate("/");
        }catch(error){
            toast.error(error.response?.data?.message || "Login failed");
        }
    }
    return (
       <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
  <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
    
    <h2 className="text-3xl font-bold text-white text-center mb-6">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 outline-none focus:border-violet-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 outline-none focus:border-violet-500"
      />

      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Login
      </button>

    </form>
  </div>
</div>
        
    )
}

export default Login;