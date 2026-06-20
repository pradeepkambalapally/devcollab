import {useState} from "react";
import api from "../api/api.jsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
    const [formData, setFormData] = useState({
        username : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post("/auth/register", formData);
            toast.success("Account created successfully!");
            navigate("/login");
        }catch(error){
            toast.error(error.response?.data?.message || "Registration failed");
        }
    }
    return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
    
    <h2 className="text-3xl font-bold text-white text-center mb-6">
      Create An Account
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
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
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
        Create Account
      </button>

    </form>
  </div>
</div>

    )
}

export default Register;