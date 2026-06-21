import {
  FiMessageSquare,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const navButton = (isActive) =>
    `group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 shadow-lg shadow-blue-600/30 scale-105"
        : "hover:bg-zinc-800 hover:scale-105"
    }`;

  return (
    <aside className="w-20 bg-zinc-950 border-r border-zinc-800 flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-zinc-800">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">
          DC
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col items-center gap-5 py-6">

        {/* Messages */}
        <button
          title="Messages"
          onClick={() => navigate("/")}
          className={navButton(location.pathname === "/")}
        >
          <FiMessageSquare size={22} />
        </button>

        {/* AI */}
        <button
          title="AI Assistant"
          onClick={() => toast("🚀 AI Assistant coming soon!")}
          className={navButton(false)}
        >
          <BsRobot size={22} />
        </button>

        {/* Profile */}
        <button
          title="Profile"
          onClick={() => navigate("/profile")}
          className={navButton(location.pathname === "/profile")}
        >
          <FiUser size={22} />
        </button>

      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 py-5 flex flex-col items-center gap-4">

        <button
          title="Settings"
          onClick={() => toast("⚙️ Settings coming soon!")}
          className={navButton(false)}
        >
          <FiSettings size={21} />
        </button>

        <button
          title="Logout"
          onClick={handleLogout}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:bg-red-600 hover:scale-105"
        >
          <FiLogOut size={21} />
        </button>

      </div>

    </aside>
  );
};

export default NavigationSidebar;