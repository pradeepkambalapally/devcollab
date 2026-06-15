import {
  FiMessageSquare,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

import { BsRobot } from "react-icons/bs";

const NavigationSidebar = () => {
  return (
    <div className="w-20 border-r border-zinc-800 flex flex-col bg-zinc-950">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg">
          DC
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col items-center gap-4">

        {/* Messages */}
        <button
          title="Messages"
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
        >
          <FiMessageSquare size={20} />
        </button>

        {/* AI Assistant */}
        <button
          title="AI Assistant"
          className="p-3 rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <BsRobot size={20} />
        </button>

        {/* Profile */}
        <button
          title="Profile"
          className="p-3 rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <FiUser size={20} />
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-4 pb-6 border-t border-zinc-800 pt-4">

        {/* Settings */}
        <button
          title="Settings"
          className="p-3 rounded-xl hover:bg-zinc-800 transition-colors"
        >
          <FiSettings size={20} />
        </button>

        {/* Logout */}
        <button
          title="Logout"
          className="p-3 rounded-xl hover:bg-red-900 transition-colors"
        >
          <FiLogOut size={20} />
        </button>

      </div>
    </div>
  );
};

export default NavigationSidebar;